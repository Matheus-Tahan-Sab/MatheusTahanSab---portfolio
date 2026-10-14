package dev.matheustahan.portfolio.contact;

import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@Service
public class ContactService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ContactService.class);
    private final RestClient resendClient;
    private final String apiKey;
    private final String sender;
    private final String recipient;
    private final boolean confirmationEnabled;

    @Autowired
    public ContactService(
        RestClient.Builder restClientBuilder,
        @Value("${portfolio.email.api-key}") String apiKey,
        @Value("${portfolio.email.from}") String sender,
        @Value("${portfolio.contact.to}") String recipient,
        @Value("${portfolio.contact.send-confirmation:false}") boolean confirmationEnabled
    ) {
        this.resendClient = restClientBuilder.baseUrl("https://api.resend.com").build();
        this.apiKey = apiKey;
        this.sender = sender;
        this.recipient = recipient;
        this.confirmationEnabled = confirmationEnabled;
    }

    public ContactService(RestClient.Builder builder, String apiKey, String sender, String recipient) {
        this(builder, apiKey, sender, recipient, false);
    }

    public void send(ContactRequest request) {
        // Honeypot simples para descartar submissões automatizadas sem revelar erro ao bot.
        if (request.website() != null && !request.website().isBlank()) {
            return;
        }
        if (apiKey == null || apiKey.isBlank()) {
            throw new EmailDeliveryException("RESEND_API_KEY não configurada.");
        }

        Map<String, Object> email = Map.of(
            "from", sender,
            "to", new String[] { recipient },
            "reply_to", request.email().trim(),
            "subject", "Nova mensagem pelo portfólio",
            "text", "Nome: " + request.name().trim()
                + "\nE-mail: " + request.email().trim()
                + "\n\nMensagem:\n" + request.message().trim(),
            "html", ContactEmailTemplates.notification(request)
        );

        try {
            deliver(email);
        } catch (RestClientException exception) {
            throw new EmailDeliveryException("Falha ao enviar mensagem pelo provedor de e-mail.", exception);
        }

        // O remetente de teste não pode enviar para visitantes. Ativação explícita
        // somente depois de configurar um remetente de domínio próprio verificado.
        if (confirmationEnabled && !sender.trim().toLowerCase(java.util.Locale.ROOT)
                .matches(".*@(?:[a-z0-9-]+\\.)*resend\\.dev>?$")) {
            Map<String, Object> confirmation = Map.of(
                "from", sender,
                "to", new String[] { request.email().trim() },
                "reply_to", recipient,
                "subject", "Recebi sua mensagem | Matheus Tahan Sab",
                "text", "Olá!\n\nObrigado por entrar em contato pelo meu portfólio. "
                    + "Sua mensagem foi encaminhada para mim. Vou ler e retornar assim que possível.\n\n"
                    + "Matheus Tahan Sab\nEstudante de Engenharia de Software\n\n"
                    + "Esta é uma confirmação automática. Se você não enviou uma mensagem, pode ignorar este e-mail.",
                "html", ContactEmailTemplates.confirmation()
            );
            try {
                deliver(confirmation);
            } catch (RestClientException exception) {
                // O contato principal já foi aceito: não pedir reenvio e duplicá-lo.
                LOGGER.warn("O contato foi aceito, mas a confirmação automática não pôde ser enviada.");
            }
        }
    }

    private void deliver(Map<String, Object> email) {
        resendClient.post().uri("/emails")
            .header("Authorization", "Bearer " + apiKey)
            .contentType(MediaType.APPLICATION_JSON)
            .body(email).retrieve().toBodilessEntity();
    }
}
