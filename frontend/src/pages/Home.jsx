import React from 'react';
import BookList from '../components/BookList';
import BookFilter from '../components/BookFilter';

export default function Home({ books, authors, onStatusFilter, onGenreFilter, onCoverFilter }) {
  return (
    <div className="App">
      <h1>Meine Büchersammlung</h1>
      <BookFilter
        onStatusFilter={onStatusFilter}
        onGenreFilter={onGenreFilter}
        onCoverFilter={onCoverFilter}
      />
      <BookList books={books} authors={authors} />
    </div>
  );
}