package dev.matheustahan.portfolio.contact;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

@Service
public class ContactService {
    private final RestClient resendClient;
    private final String apiKey;
    private final String sender;
    private final String recipient;

    public ContactService(
        RestClient.Builder restClientBuilder,
        @Value("${portfolio.email.api-key}") String apiKey,
        @Value("${portfolio.email.from}") String sender,
        @Value("${portfolio.contact.to}") String recipient
    ) {
        this.resendClient = restClientBuilder.baseUrl("https://api.resend.com").build();
        this.apiKey = apiKey;
        this.sender = sender;
        this.recipient = recipient;
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
                + "\n\nMensagem:\n" + request.message().trim()
        );

        try {
            resendClient.post()
                .uri("/emails")
                .header("Authorization", "Bearer " + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(email)
                .retrieve()
                .toBodilessEntity();
        } catch (RestClientException exception) {
            throw new EmailDeliveryException("Falha ao enviar mensagem pelo provedor de e-mail.", exception);
        }
    }
}
