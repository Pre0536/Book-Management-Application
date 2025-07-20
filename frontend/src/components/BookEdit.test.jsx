import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import BookEdit from './BookEdit'; // Pfad zu deiner BookEdit-Komponente anpassen
import '@testing-library/jest-dom';

// --- Arrange: Mocks definieren ---

// Mock für react-router-dom
// mockNavigate wird hier als Referenz für die Mock-Implementierung definiert,
// aber die tatsächliche Jest-Mock-Funktion wird im beforeEach erstellt.
let mockNavigate; 
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: () => mockNavigate, // Hier referenzieren wir die Variable
}));

jest.mock('./DeleteButton', () => ({ label, onConfirmDelete, navigateTo }) => (
  <button onClick={() => {
    onConfirmDelete();
    if (navigateTo) {
      require('react-router-dom').useNavigate()(navigateTo);
    }
  }}>{label}</button>
));


const mockBook = {
  id: 1,
  title: 'Test Buch Titel',
  author: { id: 101, name: 'Autor X' },
  genre: 'fantasy',
  cover: 'hardcover',
  status: 'read',
  details: {
    description: 'Eine Beschreibung des Testbuches.',
    pageCount: 300,
    language: 'Deutsch',
    publisher: 'Test Verlag',
  },
};

const mockAuthors = [
  { id: 101, name: 'Autor X' },
  { id: 102, name: 'Autor Y' },
];

const mockUpdateBook = jest.fn();
const mockDeleteBook = jest.fn();

describe('BookEdit', () => {
  beforeEach(() => {
    // Setzen Sie alle Mocks vor jedem Test zurück
    jest.clearAllMocks(); // Setzt alle Jest Mocks zurück

    // Initialisiere mockNavigate NEU für JEDEN Testfall
    mockNavigate = jest.fn(); // 

    // Standard-Mock für useParams
    require('react-router-dom').useParams.mockReturnValue({ id: '1' });

    // Standard-Mock für global.fetch
    global.fetch = jest.fn((url) => {
      if (url.includes('/author')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAuthors),
        });
      }
      if (url.includes('/book/1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockBook),
        });
      }
      return Promise.reject(new Error('not mocked URL'));
    });
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Stellt globale Mocks wieder her
  });


  // --- Testfall 5: Löschen eines Buches ---
  test('ruft deleteBook auf und navigiert bei erfolgreichem Löschen', async () => {
    // Arrange
    render(<BookEdit updateBook={mockUpdateBook} deleteBook={mockDeleteBook} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockBook.title)).toBeInTheDocument();
    });

    // Act
    fireEvent.click(screen.getByText('Buch löschen'));

    // Assert
    await waitFor(() => {
      expect(mockDeleteBook).toHaveBeenCalledTimes(1);
      //expect(mockDeleteBook).toHaveBeenCalledWith(1);
    });
    expect(mockNavigate).toHaveBeenCalledWith('/home'); 
  });
});