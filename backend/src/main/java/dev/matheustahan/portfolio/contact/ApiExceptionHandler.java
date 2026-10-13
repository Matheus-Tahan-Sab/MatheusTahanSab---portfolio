package dev.matheustahan.portfolio.contact;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException exception) {
        return ResponseEntity.badRequest().body(Map.of(
            "error", "Confira nome, e-mail e mensagem. Respeite os limites dos campos."
        ));
    }

    @ExceptionHandler(EmailDeliveryException.class)
    public ResponseEntity<Map<String, String>> handleMailFailure(EmailDeliveryException exception) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(Map.of(
            "error", "O serviço de e-mail está temporariamente indisponível. Tente novamente mais tarde."
        ));
    }
}
