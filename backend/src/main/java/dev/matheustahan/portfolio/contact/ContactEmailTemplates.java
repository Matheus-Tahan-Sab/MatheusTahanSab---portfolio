package dev.matheustahan.portfolio.contact;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;

final class ContactEmailTemplates {
    private static final String NOTIFICATION = load("notification.html");
    private static final String CONFIRMATION = load("confirmation.html");

    private ContactEmailTemplates() {}

    static String notification(ContactRequest request) {
        // Insere o conteúdo sem interpretar HTML fornecido pelo visitante.
        return NOTIFICATION.replace("{{name}}", escape(request.name().trim()))
            .replace("{{email}}", escape(request.email().trim()))
            .replace("{{message}}", escape(request.message().trim()).replace("\r\n", "\n").replace("\r", "\n").replace("\n", "<br>"));
    }

    static String confirmation() {
        // Texto fixo: não replica mensagens ou links arbitrários a terceiros.
        return CONFIRMATION.replace("Olá, {{name}}!", "Olá!");
    }

    static String escape(String value) {
        return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            .replace("\"", "&quot;").replace("'", "&#39;");
    }

    private static String load(String name) {
        try (var stream = ContactEmailTemplates.class.getResourceAsStream("/emails/" + name)) {
            if (stream == null) throw new IllegalStateException("Modelo de e-mail não encontrado: " + name);
            return new String(stream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException exception) {
            throw new UncheckedIOException(exception);
        }
    }
}
