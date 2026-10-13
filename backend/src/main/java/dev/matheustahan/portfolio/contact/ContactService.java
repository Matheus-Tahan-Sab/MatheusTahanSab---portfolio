package dev.matheustahan.portfolio.contact;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private final JavaMailSender mailSender;
    private final String recipient;

    public ContactService(
        JavaMailSender mailSender,
        @Value("${portfolio.contact.to}") String recipient
    ) {
        this.mailSender = mailSender;
        this.recipient = recipient;
    }

    public void send(ContactRequest request) {
        // Honeypot simples para descartar submissões automatizadas sem revelar erro ao bot.
        if (request.website() != null && !request.website().isBlank()) {
            return;
        }
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(recipient);
        mail.setSubject("Nova mensagem pelo portfólio");
        mail.setReplyTo(request.email().trim());
        mail.setText("Nome: " + request.name().trim()
            + "\nE-mail: " + request.email().trim()
            + "\n\nMensagem:\n" + request.message().trim());
        mailSender.send(mail);
    }
}
