import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthorForm from './AuthorForm';

// ---
// ## Mocks (Vorbereitungen)

// Mockt den 'useNavigate'-Hook von 'react-router-dom'.
// Das bedeutet, wenn 'useNavigate' in unserer 'AuthorForm'-Komponente aufgerufen wird,
// bekommen wir nicht die echte Navigationsfunktion, sondern unsere 'mockNavigate'-Funktion.
// So können wir überprüfen, ob die Navigation wie erwartet aufgerufen wurde.

// Erstellt eine "Spion-Funktion", die wir überwachen können.
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({

  // Jedes Mal, wenn 'useNavigate' aufgerufen wird, geben wir unser Mock zurück.
  useNavigate: () => mockNavigate,
}));

// Mockt den 'authorService'.
// Wir wollen im Test nicht wirklich API-Aufrufe machen, daher ersetzen wir den echten Service.
jest.mock('../services/authorService', () => ({

  // Wir ersetzen die 'addAuthor'-Methode durch eine Mock-Funktion,
  // die sofort ein leeres, erfolgreiches Promise zurückgibt.
  // So tun wir so, als wäre der Serveraufruf immer erfolgreich gewesen
  addAuthor: jest.fn().mockResolvedValue({})
}));

// ---
// ## Testsuite für AuthorForm

// 'describe' gruppiert zusammengehörige Tests für die 'AuthorForm'-Komponente.
describe('AuthorForm', () => {

  // 'beforeEach' wird vor jedem einzelnen Test (hier 'test') ausgeführt.
  beforeEach(() => {

    // Setzt alle Mocks (wie 'mockNavigate' und 'authorService.addAuthor') vor jedem Test zurück.
    // Das stellt sicher, dass Tests voneinander unabhängig sind und nicht das Ergebnis des vorherigen Tests beeinflussen.
    jest.clearAllMocks();
  });


  // Testfall: Fehleranzeige bei zu kurzem Namen

  // Definiert einen einzelnen Testfall.
  test('zeigt Fehler an, wenn der Name zu kurz ist', () => {


    // Arrange 
    // Hier bereiten wir die Umgebung vor, in der unser Code getestet wird.

    // Rendert die 'AuthorForm'-Komponente in einer virtuellen DOM-Umgebung.
    render(<AuthorForm />);

    // Holt sich das Input-Feld und den Submit-Button über ihren Platzhaltertext bzw. ihren Textinhalt.
    // 'screen' ist ein globales Objekt von React Testing Library, um auf gerenderte Elemente zuzugreifen.
    const input = screen.getByPlaceholderText('Autorenname');
    const submitButton = screen.getByText('Hinzufügen');

    // Act 
    // Hier simulieren wir Benutzerinteraktionen mit unserer Komponente.

    // Simuliert das Eingeben von 'JKR' in das Input-Feld.
    fireEvent.change(input, { target: { value: 'JKR' } });
    fireEvent.click(submitButton);

    // Assert 
    // Hier überprüfen wir, ob das erwartete Ergebnis eingetreten ist.

    // Überprüft, ob der Fehlertext "Feld muss mindestens 5 Zeichen beinhalten."
    // irgendwo im Dokument sichtbar ist.
    expect(screen.getByText('Feld muss mindestens 5 Zeichen beinhalten.')).toBeInTheDocument();
  });
});