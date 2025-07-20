import React, { useState, useEffect } from 'react';

import Button from './Button';

import { Link } from 'react-router-dom';

 function BookList({ books, authors }) { 

  if (!books || books.length === 0) {
    return <p>Keine Bücher gefunden.</p>;
  }

const translateValues = (type, value) => {
  const translations = {
    status: {
      read: "Gelesen",
      currentlyReading: "Lese gerade",
      wishlist: "Wunschliste"
    },
    genre: {
      romance: "Romantik",
      thriller: "Thriller",
      fantasy: "Fantasy",
      science_fiction: "Science Fiction",
      crime: "Krimi",
      comic_roman: "Roman",
      adventure: "Abenteuer"
    },
    cover: {
      hardcover: "Hardcover",
      softcover: "Softcover",
      ebook: "E-Book"
    }
  };
  
  return translations[type]?.[value] || value;
};

  return (
    <div className="app">
      <h2>Bücherliste</h2>
      <ul className="list">
        {books.map(book => {
          const author = authors.find(a => a.id === book.author.id);

          

          return (
            <li key={book.id}>
              <div className="info">
              <span><strong>{book.title}</strong></span>
              <span>| {author ? author.name : 'Unbekannter Autor'}</span>
              <span>| {translateValues('genre', book.genre)}</span>
               <span>| {translateValues('cover', book.cover)}</span>
               <span>| {translateValues('status', book.status)}</span>
              </div>
              <div className="actions">
              <Button to={`/edit/${book.id}`} label="Bearbeiten" />
              {' | '}
              <Button to={`/details/${book.id}`} label="Details" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BookList;
