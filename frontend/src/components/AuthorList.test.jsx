import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AuthorList from './AuthorList';

import '@testing-library/jest-dom';

// Mock der react-router-dom Link Komponente
// Dies ist wichtig, da die AuthorList die Link-Komponente verwendet
jest.mock('react-router-dom', () => ({
  Link: ({ children }) => <div>{children}</div>,
}));

// Mocken der globalen fetch-Funktion
const mockAuthors = [
  { id: 1, name: 'Autor A' },
  { id: 2, name: 'Autor B' },
];

describe('AuthorList', () => {
  beforeEach(() => {
    // Setzen wir den fetch-Mock vor jedem Test zurück
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAuthors),
      })
    );
  });

  afterEach(() => {
    // Stellen Sie sicher, dass fetch nach jedem Test wiederhergestellt wird
    jest.restoreAllMocks();
  });

  test('zeigt die Autorenliste nach erfolgreichem Laden an', async () => {
    // Arrange
    // Hier ist unser fetch bereits im beforeEach gemockt, um eine erfolgreiche Antwort zu liefern.

    // Act
    render(<AuthorList />);

    // Assert
    // Wait for the author list title to appear
    await waitFor(() => {
      expect(screen.getByText(/Autorenliste/i)).toBeInTheDocument();
    });

    // Now that the list is rendered, we can assert on individual elements.
    // findBy* queries implicitly wait for the element to appear.
    expect(await screen.findByText('Autor A')).toBeInTheDocument();
    expect(await screen.findByText('Autor B')).toBeInTheDocument();
    expect(screen.getAllByText('Bearbeiten').length).toBe(mockAuthors.length);
  });
    });

      test('zeigt "Keine Autoren gefunden." an, wenn die Liste leer ist', async () => {
    // Arrange
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]), // Leeres Array für Autoren
      })
    );

    // Act
    render(<AuthorList />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText(/Keine Autoren gefunden./i)).toBeInTheDocument();
    });
  });
