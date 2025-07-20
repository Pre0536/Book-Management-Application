
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


import BookForm from './components/BookForm';
import BookFilter from './components/BookFilter';
import BookList from './components/BookList';
import BookDetailsView from './components/BookDetailsView';
import BookStatistics from './components/BookStatistic';
import AuthorForm from './components/AuthorForm';
import AuthorList from './components/AuthorList';
import BookEdit from './components/BookEdit'; // Stelle sicher, dass die Komponente importiert wird
import AuthorEdit from './components/AuthorEdit';
import bookService from './services/bookService';
import authorService from './services/authorService';
import Home from './pages/Home';
import Navigation from './pages/Navigation';
import './App.css';


function App() {

  const [bookList, setBookList] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [genreFilter, setGenreFilter] = useState('all');
  const [coverFilter, setCoverFilter] = useState('all');
 
  useEffect(() => {
    fetch('http://localhost:8080/author')
      .then(res => res.json())
      .then(data => setAuthorList(data))
      .catch(() => alert('Autoren konnten nicht geladen werden'));
  }, []);

useEffect(() => {
  bookService.fetchBooks()
    .then(setBookList)
    .catch(() => alert('Bücher konnten nicht geladen werden'));
}, []);

const handleAddBook = (newBook) => {
  return bookService.addBook(newBook).then(saved => {
    setBookList(prev => [...prev, saved]);
    return saved;
  });
};

const handleUpdateBook = (updatedBook) => {
  return bookService.updateBook(updatedBook).then(updated => {
    setBookList(prev => prev.map(book => book.id === updated.id ? updated : book));
  });
};

const handleDeleteBook = (id) => {
  return bookService.deleteBook(id).then(() => {
    setBookList(prev => prev.filter(book => book.id !== id));
  });
};

useEffect(() => {
  authorService.fetchAuthors()
    .then(setAuthorList)
    .catch(() => alert('Autoren konnten nicht geladen werden'));
}, []);

useEffect(() => {
  authorService.fetchAuthors()
    .then(setAuthorList)
    .catch(() => alert('Autoren konnten nicht geladen werden'));
}, []);

const updateAuthor = (updatedAuthor) => {
  return authorService.updateAuthor(updatedAuthor).then((res) => {
    setAuthorList(prev =>
      prev.map(author => author.id === res.id ? res : author)
    );

    setBookList(prev =>
      prev.map(book =>
        book.author?.id === res.id
          ? { ...book, author: res }
          : book
      )
    );
  });
};

const deleteAuthor = (id) => {
  return authorService.deleteAuthor(id).then(() => {
    setAuthorList(prev => prev.filter(author => author.id !== id));
    setBookList(prev => prev.filter(book => book.author?.id !== id));
  });
};

  const handleStatusFilter = (value) => setStatusFilter(value);
  const handleGenreFilter = (value) => setGenreFilter(value);
  const handleCoverFilter = (value) => setCoverFilter(value);
  const filteredBooks = bookList.filter(book => {
  const statusOk = statusFilter === 'all' || book.status === statusFilter;
  const genreOk = genreFilter === 'all' || book.genre === genreFilter;
  const coverOk = coverFilter === 'all' || book.cover === coverFilter;

    return statusOk && genreOk && coverOk;
  });


  return (
    <Router>
      <div>
<header>
  <h1>Meine Bücher-App</h1>
  <Navigation />
</header>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} /> 
<Route path="/home" element={
  <Home 
    books={filteredBooks} 
    authors={authorList}
    onStatusFilter={handleStatusFilter}
    onGenreFilter={handleGenreFilter}
    onCoverFilter={handleCoverFilter}
  />
} />
              <Route path="/addBook" element={<BookForm addBook={handleAddBook} />} />
              <Route path="/details/:bookId" element={<BookDetailsView />} />
              <Route path="/statistic" element={<BookStatistics />} />
              <Route path="/authorList" element={<AuthorList authorList={authorList} />} />
              <Route path="/addAuthor" element={<AuthorForm />} />
              <Route path="/edit/:id" element={<BookEdit updateBook={handleUpdateBook} deleteBook={handleDeleteBook} />} />
              <Route path="/authorEdit/:id" element={<AuthorEdit updateAuthor={updateAuthor} deleteAuthor={deleteAuthor} />} 
            />

        </Routes>
      </div>
    </Router>
  );
}

export default App;