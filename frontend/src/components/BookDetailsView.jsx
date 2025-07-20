import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Definiert die 'BookDetailsView'-Komponente.
function BookDetailsView() {

  // Holt die 'bookId' aus den URL-Parametern.
  // Wenn die URL zum Beispiel "/book/123/details" ist, dann ist 'bookId' hier "123".
  const { bookId } = useParams();

  // Erstellt einen State für die Buchdetails und eine Funktion, um diese zu aktualisieren.
  // Initial ist 'details' null, was bedeutet, dass noch keine Daten geladen wurden.
  const [details, setDetails] = useState(null);

  // Der 'useEffect'-Hook wird ausgeführt, nachdem die Komponente zum ersten Mal gerendert wurde
  // und jedes Mal, wenn sich der Wert von 'bookId' ändert.
  useEffect(() => {

    // Führt einen Datenabruf (fetch) an die spezifische API-Endpunkt-URL durch,
    // um die Details des Buches mit der entsprechenden 'bookId' zu laden.
    fetch(`http://localhost:8080/book/${bookId}/details`)
      .then(res => {

        // Überprüft, ob die Antwort des Servers erfolgreich war (Statuscode 2xx).
        if (!res.ok) {

          // Wenn die Antwort nicht erfolgreich ist, wird ein Fehler geworfen.
          throw new Error('Fehler beim Laden der Buchdetails');
        }

        // Konvertiert die Serverantwort von JSON in ein JavaScript-Objekt.
        return res.json();
      })

      // Wenn die Daten erfolgreich geladen wurden, werden sie im 'details'-State gespeichert.
      .then(data => setDetails(data))

      // Bei einem Fehler wird ein Alert-Fenster mit einer Fehlermeldung angezeigt.
      .catch(() => alert('Details konnten nicht geladen werden'));

    // Das Array '[bookId]' sind die Abhängigkeiten: Der Effekt wird erneut ausgeführt, wenn sich 'bookId' ändert.
  }, [bookId]);

  // Wenn 'details' noch null ist (also die Daten noch geladen werden oder ein Fehler aufgetreten ist),
  // wird eine Ladeanzeige angezeigt
  if (!details) {
    return <p>Lade Buchdetails...</p>;
  }

  // Wenn 'details' geladen wurden (nicht null ist), werden die Buchdetails angezeigt.
  return (
    <div className="app">
      <h2>Buchdetails</h2>

      <div className="details-container">

        {/* Zeigt die Beschreibung des Buches an. '<hr />' fügt eine horizontale Linie hinzu. */}
        <p><strong>Beschreibung:</strong> <hr />{details.description}</p>

        {/* Zeigt die Seitenanzahl des Buches an. */}
        <p><strong>Seitenanzahl:</strong> {details.pageCount}</p>

        {/* Zeigt die Sprache des Buches an. */}
        <p><strong>Sprache:</strong> {details.language}</p>

        {/* Zeigt den Verlag des Buches an. */}
        <p><strong>Verlag:</strong> {details.publisher}</p>
      </div>
    </div>
  );
}

export default BookDetailsView;
