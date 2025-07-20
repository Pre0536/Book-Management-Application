import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Für erweiterte Matcher
import BookFilter from '../components/BookFilter'; // Pfad anpassen

describe('BookFilter', () => {
  // Arrange-Phase: Vorbereitung des Tests
  const mockOnStatusFilter = jest.fn();
  const mockOnGenreFilter = jest.fn();
  const mockOnCoverFilter = jest.fn();

  beforeEach(() => {
    // Setzt die Mock-Funktionen vor jedem Test zurück
    mockOnStatusFilter.mockClear();
    mockOnGenreFilter.mockClear();
    mockOnCoverFilter.mockClear();
  });

  test('ruft onGenreFilter mit korrektem Wert auf, wenn Genre ausgewählt ist', () => {
    // Arrange: Komponente rendern mit Mock-Funktionen
    render(
      <BookFilter
        onStatusFilter={mockOnStatusFilter}
        onGenreFilter={mockOnGenreFilter}
        onCoverFilter={mockOnCoverFilter}
      />
    );

    // Act: Eine Benutzerinteraktion simulieren (Genre-Dropdown ändern)
    const genreSelect = screen.getByLabelText(/Genre:/i);
    fireEvent.change(genreSelect, { target: { value: 'fantasy' } });

    // Assert: Überprüfen, ob die Mock-Funktion korrekt aufgerufen wurde
    expect(mockOnGenreFilter).toHaveBeenCalledTimes(1);
    expect(mockOnGenreFilter).toHaveBeenCalledWith('fantasy');
    expect(mockOnStatusFilter).not.toHaveBeenCalled(); // Sicherstellen, dass andere nicht aufgerufen wurden
    expect(mockOnCoverFilter).not.toHaveBeenCalled(); // Sicherstellen, dass andere nicht aufgerufen wurden
  });

});