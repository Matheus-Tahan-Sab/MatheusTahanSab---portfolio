package dev.matheustahan.portfolio.contact;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.jsonPath;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withServerError;
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

    @Test
    void escapesVisitorHtmlAndPreservesLineBreaks() {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        ContactService service = new ContactService(builder, "re_test", "onboarding@resend.dev", "owner@example.com");
        server.expect(requestTo("https://api.resend.com/emails"))
            .andExpect(jsonPath("$.html", containsString("&lt;b&gt;Visitante&lt;/b&gt;")))
            .andExpect(jsonPath("$.html", containsString("&lt;script&gt;alert(1)&lt;/script&gt;<br>Segunda linha")))
            .andExpect(jsonPath("$.html", not(containsString("<script>"))))
            .andRespond(withSuccess());
        service.send(new ContactRequest("<b>Visitante</b>", "visitor@example.com", "<script>alert(1)</script>\nSegunda linha", ""));
        server.verify();
    }

    @Test
    void sendsSeparateConfirmationOnlyAfterPrimaryDelivery() {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        ContactService service = new ContactService(builder, "re_test", "Contato <contato@example.org>", "owner@example.com", true);
        server.expect(requestTo("https://api.resend.com/emails"))
            .andExpect(jsonPath("$.to[0]").value("owner@example.com"))
            .andExpect(jsonPath("$.reply_to").value("visitor@example.com"))
            .andRespond(withSuccess());
        server.expect(requestTo("https://api.resend.com/emails"))
            .andExpect(jsonPath("$.to[0]").value("visitor@example.com"))
            .andExpect(jsonPath("$.reply_to").value("owner@example.com"))
            .andExpect(jsonPath("$.html", containsString("Mensagem recebida!")))
            .andExpect(jsonPath("$.html", not(containsString("malicious.example"))))
            .andExpect(jsonPath("$.text", not(containsString("malicious.example"))))
            .andRespond(withSuccess());
        service.send(new ContactRequest("https://malicious.example", " visitor@example.com ", "https://malicious.example", ""));
        server.verify();
    }

    @Test
    void testSenderNeverSendsAConfirmationEvenWhenFlagIsEnabled() {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        ContactService service = new ContactService(builder, "re_test", "Portfólio <onboarding@resend.dev>", "owner@example.com", true);
        server.expect(requestTo("https://api.resend.com/emails")).andRespond(withSuccess());
        service.send(new ContactRequest("Visitante", "visitor@example.com", "Olá", ""));
        server.verify();
    }

    @Test
    void confirmationFailureDoesNotTurnAnAcceptedContactIntoAnError() {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        ContactService service = new ContactService(builder, "re_test", "contato@example.org", "owner@example.com", true);
        server.expect(requestTo("https://api.resend.com/emails")).andRespond(withSuccess());
        server.expect(requestTo("https://api.resend.com/emails")).andRespond(withServerError());
        assertDoesNotThrow(() -> service.send(new ContactRequest("Visitante", "visitor@example.com", "Olá", "")));
        server.verify();
    }

    @Test
    void primaryFailureNeverSendsAConfirmation() {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        ContactService service = new ContactService(builder, "re_test", "contato@example.org", "owner@example.com", true);
        server.expect(requestTo("https://api.resend.com/emails")).andRespond(withServerError());
        assertThrows(EmailDeliveryException.class, () -> service.send(new ContactRequest("Visitante", "visitor@example.com", "Olá", "")));
        server.verify();
    }

    @Test
    void honeypotDoesNotSendEitherEmail() {
        RestClient.Builder builder = RestClient.builder();
        MockRestServiceServer server = MockRestServiceServer.bindTo(builder).build();
        ContactService service = new ContactService(builder, "re_test", "contato@example.org", "owner@example.com", true);
        service.send(new ContactRequest("Visitante", "visitor@example.com", "Olá", "bot"));
        server.verify();
    }
}
