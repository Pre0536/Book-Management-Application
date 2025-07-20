import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SubmitButton from './SubmitButton';
import DeleteButton from './DeleteButton';

// Definiert die 'AuthorEdit'-Komponente. Sie erhält 'updateAuthor' und 'deleteAuthor' als Props.
function AuthorEdit({ updateAuthor, deleteAuthor }) {

  // Holt die 'id' aus den URL-Parametern (z.B. wenn die URL /authorEdit/123 ist, ist id = '123')
  const { id } = useParams();

  // Initialisiert den 'navigate'-Hook, um programmatisch zu anderen Routen zu navigieren
  const navigate = useNavigate();

  // Erstellt einen State für den Namen des Autors und eine Funktion zum Aktualisieren davon
  const [name, setName] = useState('');

  // Erstellt einen State für Fehlermeldungen und eine Funktion zum Aktualisieren davon
  const [error, setError] = useState(null);

  // 'useEffect' wird ausgeführt, nachdem die Komponente zum ersten Mal gerendert wurde
  // und wenn sich die Abhängigkeiten (hier 'id') ändern.
  useEffect(() => {

    // Definiert eine asynchrone Funktion zum Abrufen der Autoreninformationen
    const fetchAuthor = async () => {

      // Führt einen Datenabruf (fetch) an die URL des spezifischen Autors durch
      try {
        const response = await fetch(`http://localhost:8080/author/${id}`);

        // Überprüft, ob die Antwort erfolgreich war (Status 200 OK)
        if (!response.ok) {

          // Wenn nicht erfolgreich, wird ein Fehler geworfen
          throw new Error('Autor konnte nicht geladen werden.');
        }

        // Konvertiert die Antwort in JSON
        const authorData = await response.json();

        // Setzt den abgerufenen Namen des Autors in den 'name'-State
        setName(authorData.name);
      } catch (err) {

        // Fängt Fehler ab, die während des Fetches auftreten, und setzt die Fehlermeldung
        setError(err.message);
      }
    };

    // Ruft die Funktion 'fetchAuthor' auf, um die Daten zu laden
    fetchAuthor();

    // Dieser Effekt wird nur dann erneut ausgeführt, wenn sich die 'id' ändert 
  }, [id]);


  // Funktion, die beim Absenden des Formulars aufgerufen wird
  const handleSubmit = async (e) => {

    // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
    e.preventDefault();

    try {

      // Ruft die 'updateAuthor'-Funktion auf (die als Prop übergeben wurde),
      // um den Autor mit der aktuellen ID und dem neuen Namen zu aktualisieren.
      // Die ID wird in eine Ganzzahl umgewandelt.
      await updateAuthor({
        id: parseInt(id),
        name
      });

      // Nach erfolgreicher Aktualisierung navigiert die Anwendung zur Autorenliste
      navigate('/authorList');
    } catch (err) {

      // Fängt Fehler ab, die beim Aktualisieren auftreten, und setzt die Fehlermeldung
      setError(err.message);
    }
  };



  // Das ist, was die Komponente rendert (anzeigt)
  return (
    <div className="app">
      <h2>Edit Author</h2>

      {/* Zeigt Fehlermeldungen an, falls vorhanden */}
      <form onSubmit={handleSubmit} className="author-form">

        {/* Eingabefeld für den Namen des Autors */}
        <input
          type="text"
          value={name} // Der Wert des Feldes ist an den 'name'-State gebunden
          onChange={(e) => setName(e.target.value)} // Aktualisiert den 'name'-State bei jeder Eingabe
          placeholder="Author Name" // Platzhaltertext
          required // Das Feld ist Pflichtfeld
        />

        {/* Ein Button zum Speichern der Änderungen */}
        <SubmitButton label="Speichern" />

        {/* Ein Button zum Löschen des Autors */}
        <DeleteButton
          label="Autor löschen" // Text auf dem Button
          confirmText="Möchten Sie den Autor wirklich löschen?" // Bestätigungstext vor dem Löschen

          // Funktion, die aufgerufen wird, wenn das Löschen bestätigt wird
          onConfirmDelete={() => deleteAuthor(parseInt(id))}

          // Route, zu der nach dem Löschen navigiert werden soll
          navigateTo="/authorList"
        />

      </form>
    </div>
  );
}
export default AuthorEdit;