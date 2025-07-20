// services/authorService.js
const API_URL = "http://localhost:8080/author";

const authorService = {
  fetchAuthors: () => {
    return fetch(API_URL).then(res => {
      if (!res.ok) throw new Error("Fehler beim Laden der Autoren");
      return res.json();
    });
  },

  addAuthor: (author) => {
    return fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(author)
    }).then(res => {
      if (!res.ok) throw new Error("Fehler beim Hinzufügen des Autors");
      return res.json();
    });
  },

  updateAuthor: (author) => {
    return fetch(`${API_URL}/${author.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: author.name }) // Nur Name senden
    }).then(res => {
      if (!res.ok) throw new Error("Fehler beim Aktualisieren des Autors");
      return res.json();
    });
  },

  deleteAuthor: (id) => {
    return fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    }).then(res => {
      if (!res.ok) throw new Error("Fehler beim Löschen des Autors");
    });
  }
};

export default authorService;
