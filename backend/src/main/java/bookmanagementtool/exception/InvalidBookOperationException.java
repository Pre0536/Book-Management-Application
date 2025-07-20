package bookmanagementtool.exception;

/**
 * Diese Ausnahme wird ausgelöst, wenn eine ungültige Operation an einem
 * Buchobjekt versucht wird. Zum Beispiel könnte dies der Fall sein, wenn
 * versucht wird, ein Buch zu löschen, das noch mit einem Autor verknüpft ist,
 * und dies durch die Geschäftslogik nicht erlaubt ist. Sie erweitert
 * {@link RuntimeException}, was bedeutet, dass es sich um eine ungeprüfte
 * Ausnahme handelt und nicht explizit abgefangen werden muss.
 * 
 * Diese Ausnahme signalisiert in der Regel ein Problem mit der Geschäftslogik
 * oder den Daten, das vom Anwender korrigiert werden sollte, indem die
 * ungültige Operation vermieden wird.
 * 
 */
public class InvalidBookOperationException extends RuntimeException {

	/**
	 * Konstruktor für InvalidBookOperationException mit einer spezifischen
	 * Fehlermeldung.
	 *
	 * @param message Die detaillierte Nachricht, die den Grund für die Ausnahme
	 *                angibt. Diese Nachricht kann dem Benutzer oder dem Entwickler
	 *                angezeigt werden, um das Problem zu identifizieren und die
	 *                korrekte Operation zu ermöglichen.
	 */
	public InvalidBookOperationException(String message) {
		super(message);
	}
}
