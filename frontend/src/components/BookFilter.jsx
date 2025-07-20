
import React from 'react';


function BookFilter({ onStatusFilter, onGenreFilter, onCoverFilter }) {


  return (
    <div className="filter-container">
      <h3>Filter</h3>

       <div className="filter-row">
      <div className="filter-group">

      {/* Filter-Dropdown für das Genre */}


        {/* Das <select>-Element ermöglicht die Auswahl eines Genres. */}
        {/* 'onChange' wird ausgelöst, wenn der Benutzer eine neue Option wählt. */}
        {/* 'e.target.value' ist der Wert der ausgewählten Option. */}
        {/* 'onGenreFilter' (die als Prop übergebene Funktion) wird mit diesem Wert aufgerufen. */}
        {/* 'defaultValue="all"' setzt die Standardauswahl auf "Alle". */}
        <label htmlFor="genre-select">Genre:</label>
  <select id="genre-select" onChange={e => onGenreFilter(e.target.value)} defaultValue="all">
          <option value="all">Alle</option>
          <option value="romance">Romantik</option>
          <option value="thriller">Thriller</option>
          <option value="fantasy">Fantasy</option>
          <option value="science_fiction">Science Fiction</option>
          <option value="crime">Krimi</option>
          <option value="comic_roman">Roman</option>
          <option value="adventure">Abenteuer</option>
        </select>
     
</div>
      
      {/* Filter-Dropdown für das Cover */}
      <div className="filter-group">
      <label>
        Cover:
        </label>

        {/* Ähnlich wie beim Genre-Filter, aber für die Cover-Art. */}
        {/* Die 'onCoverFilter'-Funktion wird bei Änderungen aufgerufen. */}
        <select onChange={e => onCoverFilter(e.target.value)} defaultValue="all">
          <option value="all">Alle</option>
          <option value="hardcover">Hardcover</option>
          <option value="softcover">Softcover</option>
          <option value="ebook">E-Book</option>
        </select>
      </div>

      
      {/* Filter-Dropdown für den Status */}
      <div className="filter-group">
      <label>
        Status:
</label>
        {/* Ähnlich wie bei den anderen Filtern, aber für den Lesestatus. */}
        {/* Die 'onStatusFilter'-Funktion wird bei Änderungen aufgerufen. */}
        <select onChange={e => onStatusFilter(e.target.value)} defaultValue="all">
          <option value="all">Alle</option>
          <option value="read">Gelesen</option>
          <option value="currentlyReading">Lese gerade</option>
          <option value="wishlist">Wunschliste</option>
        </select>
      </div>
    </div>
    </div>
  );
}

// Exportiere die 'BookFilter'-Komponente als Standardexport,
// damit sie in anderen Dateien (z.B. App.js) importiert und verwendet werden kann.
export default BookFilter;
