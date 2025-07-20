package bookmanagementtool.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Diese Ausnahme wird ausgelöst, wenn ein angeforderter Autor nicht gefunden
 * werden kann. Sie erweitert {@link RuntimeException}, was bedeutet, dass es
 * sich um eine ungeprüfte Ausnahme handelt und nicht explizit abgefangen werden
 * muss.
 * 
 * Typischerweise wird diese Ausnahme von Spring Framework mit einem
 * HTTP-Statuscode verknüpft, wenn sie in einem Controller ausgelöst wird (z.B.
 * durch die Verwendung von {@link ResponseStatus}, obwohl hier nicht direkt
 * annotiert, könnte dies in der globalen Exception-Behandlung konfiguriert
 * sein).
 * 
 */
public class AuthorNotFoundException extends RuntimeException {

	/**
	 * Konstruktor für AuthorNotFoundException mit einer spezifischen Fehlermeldung.
	 *
	 * @param message Die detaillierte Nachricht, die den Grund für die Ausnahme
	 *                angibt. Diese Nachricht kann dem Benutzer oder dem Entwickler
	 *                angezeigt werden, um das Problem zu identifizieren.
	 */
	public AuthorNotFoundException(String message) {
		super(message);
	}

}
