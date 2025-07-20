package bookmanagementtool.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Der {@code ControllerAdvisor} ist eine globale Fehlerbehandlungsklasse für
 * die REST-API. Durch die Annotation {@code @ControllerAdvice} kann diese
 * Klasse Ausnahmen über alle Controller hinweg abfangen und eine einheitliche
 * Fehlerantwort zurückgeben. Sie erweitert
 * {@link ResponseEntityExceptionHandler}, um die Handhabung von Spring
 * MVC-Standardausnahmen zu erleichtern.
 */
@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

	/**
	 * Behandelt Ausnahmen vom Typ {@link MethodArgumentNotValidException}, die
	 * ausgelöst werden, wenn die Validierung von Argumenten für Controller-Methoden
	 * fehlschlägt (z.B. bei {@code @Valid}-Annotationen). Diese Methode formatiert
	 * die Validierungsfehler in eine benutzerfreundliche JSON-Antwort.
	 *
	 * @param ex      Die ausgelöste {@link MethodArgumentNotValidException}.
	 * @param headers Die HTTP-Header der Anfrage.
	 * @param status  Der HTTP-Status, der zurückgegeben werden soll.
	 * @param request Das aktuelle WebRequest-Objekt.
	 * @return Ein {@link ResponseEntity} mit einer detaillierten Fehlerbeschreibung
	 *         und dem HTTP-Status {@code BAD_REQUEST}.
	 */
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {

		Map<String, Object> body = new HashMap<>();
		Map<String, String> errors = new HashMap<>();

		// Alle Validierungsfehler extrahieren
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});

		body.put("timestamp", LocalDateTime.now());
		body.put("status", status.value());
		body.put("errors", errors);

		return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
	}

	/**
	 * Behandelt Ausnahmen vom Typ {@link BookNotFoundException}. Diese Methode wird
	 * aufgerufen, wenn ein angefordertes Buch nicht gefunden werden kann.
	 *
	 * @param ex      Die ausgelöste {@link BookNotFoundException}.
	 * @param request Das aktuelle WebRequest-Objekt.
	 * @return Ein {@link ResponseEntity} mit einer Fehlermeldung und dem
	 *         HTTP-Status {@code NOT_FOUND}.
	 */
	@ExceptionHandler(BookNotFoundException.class)
	public ResponseEntity<Object> handleBookNotFoundException(BookNotFoundException ex, WebRequest request) {

		Map<String, Object> body = new HashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("status", HttpStatus.NOT_FOUND.value());
		body.put("errorType", "Not Found");
		body.put("message", ex.getMessage()); // Die Fehlermeldung aus der Exception

		return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
	}

	/**
	 * Behandelt Ausnahmen vom Typ {@link AuthorNotFoundException}. Diese Methode
	 * wird aufgerufen, wenn ein angeforderter Autor nicht gefunden werden kann.
	 *
	 * @param ex      Die ausgelöste {@link AuthorNotFoundException}.
	 * @param request Das aktuelle WebRequest-Objekt.
	 * @return Ein {@link ResponseEntity} mit einer Fehlermeldung und dem
	 *         HTTP-Status {@code NOT_FOUND}.
	 */
	@ExceptionHandler(AuthorNotFoundException.class)
	public ResponseEntity<Object> handleAuthorNotFoundException(AuthorNotFoundException ex, WebRequest request) {

		Map<String, Object> body = new HashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("status", HttpStatus.NOT_FOUND.value());
		body.put("errorType", "Not Found");
		body.put("message", ex.getMessage());

		return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
	}

	/**
	 * Behandelt Ausnahmen vom Typ {@link InvalidBookOperationException}. Diese
	 * Methode wird aufgerufen, wenn eine ungültige Operation in Bezug auf ein Buch
	 * versucht wird.
	 *
	 * @param ex      Die ausgelöste {@link InvalidBookOperationException}.
	 * @param request Das aktuelle WebRequest-Objekt.
	 * @return Ein {@link ResponseEntity} mit einer Fehlermeldung und dem
	 *         HTTP-Status {@code BAD_REQUEST}.
	 */
	@ExceptionHandler(InvalidBookOperationException.class)
	public ResponseEntity<Object> handleInvalidBookOperationException(InvalidBookOperationException ex,
			WebRequest request) {

		Map<String, Object> body = new HashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("status", HttpStatus.BAD_REQUEST.value());
		body.put("errorType", "Invalid Operation");
		body.put("message", ex.getMessage());

		return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
	}

}
