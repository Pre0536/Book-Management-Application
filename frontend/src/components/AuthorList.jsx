import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

function AuthorList() {

  // Erstellt einen State für die Autorenliste und eine Funktion zum Aktualisieren davon
  const [authorList, setAuthorList] = useState([]);

  // Erstellt einen State für Fehlermeldungen und eine Funktion zum Aktualisieren davon
  const [error, setError] = useState('');

  // 'useEffect' wird ausgeführt, nachdem die Komponente zum ersten Mal gerendert wurde
  // und wenn sich die Abhängigkeiten (hier ein leeres Array) ändern.
  // Ein leeres Array bedeutet, dass es nur einmal beim Laden der Komponente ausgeführt wird.
  useEffect(() => {

    // Führt einen Datenabruf (fetch) an die URL des Backend-Endpunkts durch
    fetch('http://localhost:8080/author')
      .then(response => {

        // Überprüft, ob die Antwort erfolgreich war (Status 200 OK)
        if (!response.ok) {

          // Wenn nicht erfolgreich, wird ein Fehler geworfen
          throw new Error('Fehler beim Laden der Autoren.');
        }

        // Konvertiert die Antwort in JSON
        return response.json();
      })
      .then(data => {

        // Setzt die abgerufenen Daten in den 'authorList'-State
        setAuthorList(data);
      })
      .catch(error => {

        // Fängt Fehler ab, die während des Fetches auftreten, und setzt die Fehlermeldung
        setError(error.message);
      });

  }, []);

  // Wenn ein Fehler vorliegt, wird eine Fehlermeldung angezeigt
  if (error) {
    return { error };
  }

  // Wenn keine Autoren gefunden wurden, wird eine entsprechende Nachricht angezeigt
  if (authorList.length === 0) {
    return <p>Keine Autoren gefunden.</p>;
  }

  // Das ist, was die Komponente rendert (anzeigt)
  return (
    <div className="app" >
      <h2>Autorenliste</h2>
      <ul className="author-list">

        {/* Iteriert über die 'authorList' und rendert für jeden Autor ein Listenelement */}
        {authorList.map(author => (


          <li key={author.id}> {/* Der 'key' hilft React, Elemente effizient zu aktualisieren */}


            <div className="author-info"> {author.name} </div> {/* Zeigt den Namen des Autors an */}

            <div className="author-actions"></div>

            {/* Ein Button zum Bearbeiten des Autors, der zur 'authorEdit'-Seite navigiert */}
            <Button to={`/authorEdit/${author.id}`} label="Bearbeiten" />          </li>
        ))}

      </ul>
    </div>
  );
}

export default AuthorList;
