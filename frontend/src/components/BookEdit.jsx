import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SubmitButton from './SubmitButton';
import DeleteButton from './DeleteButton';

// Definiert die 'BookEdit'-Komponente. Sie erhält 'updateBook' und 'deleteBook' als Props (Funktionen von einer übergeordneten Komponente).
function BookEdit({ updateBook, deleteBook }) {

  // Holt die 'id' des Buches aus den URL-Parametern (z.B. wenn die URL /bookEdit/123 ist, ist id = '123').
  const { id } = useParams();

  // Initialisiert den 'navigate'-Hook, um programmatisch zu anderen Routen zu navigieren.
  const navigate = useNavigate();

  // Erstellt einen State für alle Buchdaten. 'bookData' ist ein Objekt, das alle Felder des Buches enthält,
  // einschließlich verschachtelter 'details' und 'author'.
  // Standardwerte werden gesetzt, um Fehler zu vermeiden, falls Daten fehlen.
  const [bookData, setBookData] = useState({
    title: '',
    author: { id: '' }, // Autor-Objekt mit einer leeren ID
    genre: '',
    cover: '',
    status: '',
    details: {
      description: '', // Verschachteltes 'details'-Objekt
      pageCount: '',
      language: '',
      publisher: ''
    }
  });
  
  // Erstellt einen State für die Liste aller verfügbaren Autoren, die in einem Dropdown angezeigt werden.
  const [authors, setAuthors] = useState([]);

  // Erstellt einen State für Fehlermeldungen.
  const [error, setError] = useState(null);

  // Der 'useEffect'-Hook wird ausgeführt, nachdem die Komponente zum ersten Mal gerendert wurde
  // und jedes Mal, wenn sich die 'id' des Buches ändert.
  useEffect(() => {

    // Definiert eine asynchrone Funktion zum Laden der Buchdaten und der Autorenliste.
      const fetchData = async () => {
      try {

        // --- Autoren laden ---
        // Führt einen Datenabruf für alle Autoren durch.
        const authorsRes = await fetch('http://localhost:8080/author');

        // Überprüft, ob der Abruf erfolgreich war. Wenn nicht, wird ein Fehler geworfen.
        if (!authorsRes.ok) throw new Error('Failed to load authors');

        // Konvertiert die Antwort in JSON.
        const authorsData = await authorsRes.json();

        // Speichert die geladenen Autoren im 'authors'-State.
        setAuthors(authorsData);

        // --- Buchdaten laden ---
        // Führt einen Datenabruf für das spezifische Buch anhand seiner ID durch.
        const bookRes = await fetch(`http://localhost:8080/book/${id}`);
        
        // Überprüft, ob das Buch gefunden wurde. Wenn nicht, wird ein Fehler geworfen.
        if (!bookRes.ok) throw new Error('Book not found');

        // Konvertiert die Antwort in JSON.
        const bookData = await bookRes.json();
        
        // Aktualisiert den 'bookData'-State mit den geladenen Buchdaten.
        // Dabei werden Standardwerte für 'author' und 'details' gesetzt, falls diese in den geladenen Daten fehlen sollten.
        setBookData({

          // Übernimmt alle geladenen Buchdaten
          ...bookData,

          // Stellt sicher, dass 'author' ein Objekt mit 'id' ist
          author: bookData.author || { id: '' }, 

          // Stellt sicher, dass 'details' ein Objekt mit allen Unterfeldern ist
          details: bookData.details || {
            description: '',
            pageCount: '',
            language: '',
            publisher: ''
          }
        });
        
      } catch (err) {

        // Fängt Fehler ab, die beim Laden der Daten auftreten, und speichert die Fehlermeldung.
        setError(err.message);
      } 
    };

    // Ruft die 'fetchData'-Funktion auf, um die Daten zu laden, wenn die Komponente gemountet wird oder die ID sich ändert.
    fetchData();

    // Der Effekt wird nur dann erneut ausgeführt, wenn sich die 'id' ändert.
  }, [id]);

// Funktion zum Behandeln von Änderungen in den einfachen Eingabefeldern (Titel, Genre, Cover, Status).
  const handleChange = (e) => {

    // Holt den Namen des Eingabefeldes und seinen neuen Wert.
    const { name, value } = e.target;

    // Aktualisiert den 'bookData'-State: Erstellt eine Kopie des vorherigen States und überschreibt das Feld mit dem passenden Namen.
    setBookData(prev => ({ ...prev, [name]: value }));
  };

    // Funktion zum Behandeln von Änderungen in den verschachtelten 'details'-Feldern (Beschreibung, Seitenanzahl, Sprache, Verlag).
  const handleDetailChange = (e) => {

    // Holt den Namen des Eingabefeldes und seinen neuen Wert.
    const { name, value } = e.target;

    // Aktualisiert den 'bookData'-State:
    // Kopiert den vorherigen State, kopiert das 'details'-Objekt und überschreibt darin das Feld mit dem passenden Namen.
    setBookData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: value
      }
    }));
  };

  // Funktion, die beim Absenden des Formulars aufgerufen wird.
  const handleSubmit = async (e) => {

    // Verhindert das Standardverhalten des Browsars (Seitenneuladen).
    e.preventDefault();
    try {

      // Ruft die 'updateBook'-Funktion auf (die als Prop übergeben wurde),
      // um das Buch mit den aktuellen Daten zu aktualisieren.
      // Die 'id' des Buches und die 'id' des Autors werden in Ganzzahlen umgewandelt.
      await updateBook({

        // Alle aktuellen Buchdaten
        ...bookData,

        // Buch-ID als Ganzzahl
        id: parseInt(id),

        // Autor-ID als Ganzzahl
        author: { id: parseInt(bookData.author.id) }
      });

      // Nach erfolgreicher Aktualisierung navigiert die Anwendung zur 'home'-Seite (oder einer anderen gewünschten Seite).
      navigate('/home');
    } catch (err) {

      // Fängt Fehler ab, die beim Aktualisieren auftreten, und speichert die Fehlermeldung.

      setError(err.message);
    } 
  };


  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="app" >
      <h2>Edit Book</h2>

      <form onSubmit={handleSubmit} className="form" >
 <div className="form-group">
        <input
          name="title"
          value={bookData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
</div>


      <div className="form-row">
        <div className="form-group">
        <select
          name="author.id"
          value={bookData.author.id}
          onChange={handleChange}
          required
        >
          <option value="">Select Author</option>
          {authors.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        </div>

<div className="form-group">
        <select 
          name="genre"
          value={bookData.genre}
          onChange={handleChange}
          required
        >
          <option value="">Genre wählen</option>
          <option value="romance">Romantik</option>
          <option value="thriller">Thriller</option>
          <option value="fantasy">Fantasy</option>
          <option value="science_fiction">Science Fiction</option>
          <option value="crime">Krimi</option>
          <option value="comic_roman">Roman</option>
        </select>
 </div>
        </div>


      <div className="form-row">
        <div className="form-group">
        <select 
          name="cover"
          value={bookData.cover}
          onChange={handleChange}
          required
        >
          <option value="">Cover wählen</option>
          <option value="hardcover">Hardcover</option>
          <option value="softcover">Softcover</option>
          <option value="ebook">E-Book</option>
        </select>
        </div>

<div className="form-group">
        <select 
          name="status"
          value={bookData.status}
          onChange={handleChange}
          required
        >
          <option value="">Status wählen</option>
          <option value="read">Gelesen</option>
          <option value="currentlyReading">Lese gerade</option>
          <option value="wishlist">Wunschliste</option>
        </select>
                </div>
      </div>


<div className="form-group">
        <textarea
          name="description"
          value={bookData.details.description}
          onChange={handleDetailChange}
          placeholder="Beschreibung"
        />
          </div>

    <div className="form-row">
        <div className="form-group">
        <input
          type="number"
          name="pageCount"
          value={bookData.details.pageCount}
          onChange={handleDetailChange}
          placeholder="Seitenanzahl"
        />
        </div>

<div className="form-group">
        <input
          name="language"
          value={bookData.details.language}
          onChange={handleDetailChange}
          placeholder="Sprache"
        />
        </div>

 <div className="form-group">
        <input
          name="publisher"
          value={bookData.details.publisher}
          onChange={handleDetailChange}
          placeholder="Verlag"
        />
</div>

</div>
<SubmitButton label="Speichern" />

        <DeleteButton 
  label="Buch löschen"
  confirmText="Möchten Sie das Buch wirklich löschen?"
  onConfirmDelete={() => deleteBook(parseInt(id))}
  navigateTo="/home"
/>
      </form>
    </div>
  );
}

export default BookEdit;