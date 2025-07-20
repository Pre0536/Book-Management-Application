package bookmanagementtool.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Diese Ausnahme wird ausgelöst, wenn ein angefordertes Buch nicht gefunden
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
public class BookNotFoundException extends RuntimeException {

	/**
	 * Konstruktor für BookNotFoundException mit einer spezifischen Fehlermeldung.
	 *
	 * @param message Die detaillierte Nachricht, die den Grund für die Ausnahme
	 *                angibt. Diese Nachricht kann dem Benutzer oder dem Entwickler
	 *                angezeigt werden, um das Problem zu identifizieren.
	 */
	public BookNotFoundException(String message) {
		super(message);
	}

	/**
	 * Konstruktor für BookNotFoundException mit einer spezifischen Fehlermeldung
	 * und einer Ursache. Dieser Konstruktor ist nützlich, wenn die aktuelle
	 * Ausnahme durch eine andere, zugrunde liegende Ausnahme verursacht wurde.
	 *
	 * @param message Die detaillierte Nachricht, die den Grund für die Ausnahme
	 *                angibt.
	 * @param cause   Die Ursache (die zugrunde liegende Ausnahme), die diese
	 *                Ausnahme ausgelöst hat. Dies ist nützlich für die
	 *                Fehlerbehebung und das Verständnis der Kette von Ereignissen.
	 */
	public BookNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

}
