const API_URL = "http://localhost:8080/book";

const bookService = {
  fetchBooks: () => {
    return fetch(API_URL).then(res => {
      if (!res.ok) throw new Error("Fehler beim Laden der Bücher");
      return res.json();
    });
  },
  addBook: (book) => {
    console.log("Book wird gesendet:", book);

    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    }).then(res => {
      if (!res.ok) throw new Error('Fehler beim Hinzufügen des Buchs');
      return res.json();
    });
  },
  updateBook: (book) => {
    return fetch(`${API_URL}/${book.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    }).then(res => {
      if (!res.ok) throw new Error('Fehler beim Aktualisieren des Buchs');
      return res.json();
    });
  },
  deleteBook: (id) => {
    return fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    }).then(res => {
      if (!res.ok) throw new Error('Fehler beim Löschen des Buchs');
    });
  }
};

export default bookService;
