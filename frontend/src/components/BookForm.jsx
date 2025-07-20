import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmitButton from './SubmitButton';

function BookForm({ addBook }) {

  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState([]);
  const [genre, setGenre] = useState('');
  const [cover, setCover] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [language, setLanguage] = useState('');
  const [publisher, setPublisher] = useState('');
  const navigate = useNavigate();

  // --- useEffect Hook (Autoren vom Backend laden) ---

  // Dieser 'useEffect'-Hook wird einmalig ausgeführt, wenn die 'BookForm'-Komponente
  // zum ersten Mal gerendert wird.
  // Er ist dafür zuständig, die Liste der Autoren vom Backend abzurufen,
  // damit sie im Dropdown-Menü für die Autorauswahl angezeigt werden können.
  useEffect(() => {

    fetch('http://localhost:8080/author')
      .then(response => response.json())
      .then(data => setAuthors(data))
      .catch(error => {
        console.error('Fehler beim Laden der Autoren:', error);
      });

    // Das leere Abhängigkeiten-Array '[]' stellt sicher, dass dieser Effekt nur einmal läuft.
  }, []);

  // --- handleSubmit Funktion (Formular absenden) ---

  // Diese Funktion wird aufgerufen, wenn das Formular abgesendet wird.
  // Sie ist 'async', da sie auf die 'addBook'-Funktion warten muss.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedAuthor = authors.find(a => a.id === parseInt(authorId, 10));
    if (!selectedAuthor) {
      alert('Bitte einen gültigen Autor auswählen.');
      return;
    }

    const newBook = {
      title,
      genre,
      cover,
      status,
      author: { id: selectedAuthor.id },
      details: {
        description,
        language,
        pageCount: parseInt(pageCount, 10),
        publisher
      }
    };

    try {
      await addBook(newBook);
      navigate('/home');
    }
    catch (error) {
      console.error('Fehler beim Hinzufügen:', error);
      alert('Buch konnte nicht gespeichert werden.');
    }
  };

  return (
    <div className="app">
      <h2>Neues Buch hinzufügen</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div className="form-group">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Titel"
          required
        />
        </div>

      <div className="form-row">
        <div className="form-group">
        <select
          value={authorId}
          onChange={e => setAuthorId(e.target.value)}
          required
        >

          <option value="">Autor wählen</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
</div>


<div className="form-group">
        <select
          value={genre}
          onChange={e => setGenre(e.target.value)}
          required
        >
          <option value="">Genre wählen</option>
          <option value="romance">Romantik</option>
          <option value="thriller">Thriller</option>
          <option value="fantasy">Fantasy</option>
          <option value="science_fiction">Science Fiction</option>
          <option value="crime">Krimi</option>
          <option value="comic_roman">Roman</option>
          <option value="adventure">Abenteuer</option>
        </select>
        </div>
</div>

 <div className="form-row">
<div className="form-group">
        <select
          value={cover}
          onChange={e => setCover(e.target.value)}
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
          value={status}
          onChange={e => setStatus(e.target.value)}
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
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Beschreibung"
          required
        />
        </div>

      <div className="form-row">
        <div className="form-group">
        <input
          type="number"
          value={pageCount}
          onChange={e => setPageCount(e.target.value)}
          placeholder="Seitenanzahl"
          required
        />
          </div>

<div className="form-group">
        <input
          value={language}
          onChange={e => setLanguage(e.target.value)}
          placeholder="Sprache"
          required
        />
</div>

 <div className="form-group">
        <input
          value={publisher}
          onChange={e => setPublisher(e.target.value)}
          placeholder="Verlag"
          required
        />
        </div> </div>
        

        <SubmitButton label="Hinzufügen" />
        
      </form>
    </div>
    
    
  );
}
export default BookForm;
