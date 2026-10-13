package dev.matheustahan.portfolio.contact;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ContactController.class)
class ContactControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContactService contactService;

    @Test
    void acceptsValidContactMessage() throws Exception {
        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"name":"Matheus","email":"visitante@example.com","message":"Olá","website":""}
                    """))
            .andExpect(status().isNoContent());

        verify(contactService).send(new ContactRequest("Matheus", "visitante@example.com", "Olá", ""));
    }

    @Test
    void rejectsInvalidEmailWithoutCallingMailService() throws Exception {
        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"name":"Matheus","email":"email-invalido","message":"Olá","website":""}
                    """))
            .andExpect(status().isBadRequest());

        verifyNoInteractions(contactService);
    }

    @Test
    void rejectsBlankMessage() throws Exception {
        mockMvc.perform(post("/api/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"name":"Matheus","email":"visitante@example.com","message":"   ","website":""}
                    """))
            .andExpect(status().isBadRequest());

        verifyNoInteractions(contactService);
    }
}
