import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import authorService from '../services/authorService';
import SubmitButton from './SubmitButton';

// Definiert die React-Komponente 'AuthorForm'.
function AuthorForm() {

  // Deklariert einen State-Variablen 'name' und die Funktion 'setName' zum Aktualisieren.
  // 'name' speichert den aktuellen Wert des Eingabefeldes für den Autorennamen.
  const [name, setName] = useState('');

  // Deklariert einen State-Variablen 'error' und die Funktion 'setError' zum Aktualisieren.
  // 'error' speichert Fehlermeldungen, die dem Benutzer angezeigt werden.
  const [error, setError] = useState('');

  // Initialisiert den 'useNavigate'-Hook, um später die Navigation zu steuern.
  const navigate = useNavigate();

  // Diese Funktion wird aufgerufen, wenn das Formular abgeschickt wird.
  const handleSubmit = (e) => {

    // Verhindert das Standardverhalten des Browsers (Seitenneuladen beim Absenden des Formulars).
    e.preventDefault();

    // Überprüft, ob der eingegebene Name weniger als 5 Zeichen lang ist.
    if (name.trim().length < 5) {

      // Wenn ja, wird eine Fehlermeldung gesetzt und die Funktion beendet.
      setError("Feld muss mindestens 5 Zeichen beinhalten.");
      return;
    }

    // Setzt die Fehlermeldung zurück, falls zuvor eine vorhanden war.
    setError("");

    // Erstellt ein neues Autor-Objekt mit dem eingegebenen Namen.
    const newAuthor = { name };

    // Ruft die 'addAuthor'-Methode des 'authorService' auf, um den neuen Autor zum Backend hinzuzufügen.
    authorService.addAuthor(newAuthor)

      // Bei Erfolg navigiert die Anwendung zur '/authorList'-Seite.
      .then(() => navigate('/authorList'))

      // Bei einem Fehler wird die Fehlermeldung im 'error'-State gespeichert.
      .catch(error => setError(error.message));
  };

  // Das ist der Teil der Komponente, der auf der Webseite angezeigt wird.
  return (
    <div className="app">

      {/* Überschrift für die Seite */}
      <h2>Neuen Autor hinzufügen</h2>

      {/* Zeigt die Fehlermeldung an, wenn der 'error'-State nicht leer ist.*/}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Das Formular zum Hinzufügen eines Autors. 'onSubmit' verknüpft es mit der 'handleSubmit'-Funktion. */}
      <form onSubmit={handleSubmit} className="form">

        {/* Das Eingabefeld für den Autorennamen. */}
        <input
          value={name} // Der Wert des Eingabefeldes ist an den 'name'-State gebunden.
          onChange={(e) => setName(e.target.value)} // Bei jeder Änderung im Feld wird der 'name'-State aktualisiert.
          placeholder="Autorenname" // Platzhaltertext, der angezeigt wird, wenn das Feld leer ist.
          type='text' // Legt den Eingabetyp als Text fest.
          required // Macht das Feld zu einem Pflichtfeld.
        />

        <div className="actions"></div> {/* Ein leeres div für Styling-Zwecke (z.B. für Buttons). */}

        {/* Der Button zum Absenden des Formulars. */}
        <SubmitButton label="Hinzufügen" />
      </form>
    </div>
  );
}

export default AuthorForm;
