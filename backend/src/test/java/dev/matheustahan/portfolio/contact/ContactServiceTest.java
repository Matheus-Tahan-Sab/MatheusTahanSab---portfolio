package dev.matheustahan.portfolio.contact;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.header;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.RestClient;

class ContactServiceTest {
    @Test
    void sendsToResendWithFixedRecipientAndVisitorReplyTo() {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        ContactService service = new ContactService(
            builder, "re_test_key", "onboarding@resend.dev", "owner@example.com"
        );
        server.expect(requestTo("https://api.resend.com/emails"))
            .andExpect(method(HttpMethod.POST))
            .andExpect(header("Authorization", "Bearer re_test_key"))
            .andExpect(content().json("""
                {
                  "from":"onboarding@resend.dev",
                  "to":["owner@example.com"],
                  "reply_to":"visitor@example.com",
                  "subject":"Nova mensagem pelo portfólio",
                  "text":"Nome: Visitante\\nE-mail: visitor@example.com\\n\\nMensagem:\\nOlá"
                }
                """))
            .andRespond(withSuccess("{\"id\":\"email-id\"}", MediaType.APPLICATION_JSON));

        service.send(new ContactRequest("Visitante", "visitor@example.com", "Olá", ""));
        server.verify();
    }

    @Test
    void refusesToSendWithoutProviderApiKey() {
        ContactService service = new ContactService(
            RestClient.builder(), " ", "onboarding@resend.dev", "owner@example.com"
        );

        assertThrows(EmailDeliveryException.class,
            () -> service.send(new ContactRequest("Visitante", "visitor@example.com", "Olá", "")));
    }
}
