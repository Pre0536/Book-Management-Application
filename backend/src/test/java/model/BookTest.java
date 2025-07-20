package model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import bookmanagementtool.model.Author;
import bookmanagementtool.model.Book;
import bookmanagementtool.model.Details;

import static org.junit.jupiter.api.Assertions.*;

/**
 * JUnit 5 Testklasse für die Book-Modellklasse.
 * Diese Tests überprüfen die grundlegende Funktionalität
 * der Book-Entität, wie Konstruktoren, Getter und Setter,
 * sowie die Beziehungen zu Author und Details.
 */
public class BookTest {
	
    private Book book;
    private Author author;
    private Details details;

    /**
     * Diese Methode wird vor jedem Test ausgeführt.
     * Sie initialisiert ein neues Book-, Author- und Details-Objekt,
     * um eine saubere Ausgangsbasis für jeden Test zu gewährleisten.
     */
    @BeforeEach
    void setUp() {
        // Initialisiere ein Author-Objekt für die Beziehung
        author = new Author();
        author.setId(1);
        author.setName("J. K. Rowling");

        // Initialisiere ein Details-Objekt für die Beziehung
        details = new Details();
        details.setDescription("Harrys viertes Schuljahr in Hogwarts beginnt und ein Wettkampf hält die Schüler in Atem: das Trimagische Turnier, in dem Harry eine Rolle übernimmt, die er sich im Traum nicht vorgestellt hätte. Natürlich steckt dahinter das Böse, das zurück an die Macht drängt: Lord Voldemort. Es wird eng für Harry. Doch auf seine Freunde und ihre Unterstützung kann er sich auch in verzweifelten Situationen verlassen.");
        details.setPageCount(704);
        details.setLanguage("Deutsch");
        details.setPublisher("Carlsen");
        

        // Initialisiere ein Book-Objekt mit Standardwerten
        book = new Book();
        book.setId(1);
        book.setTitle("Harry Potter und der Feuerkelch");
        book.setAuthor(author); // Setze den Author
        book.setGenre("Fantasy");
        book.setCover("Hardcover");
        book.setStatus("Currently Reading");
        book.setDetails(details); // Setze die Details
        details.setBook(book); // Stelle die bidirektionale Verknüpfung her
    }

    /**
     * Testet die Erstellung eines Book-Objekts und die korrekte Zuweisung
     * der ID durch den Setter.
     */
    @Test
    @DisplayName("Should set and get ID correctly")
    void testSetAndGetId() {
        Integer newId = 4;
        book.setId(newId);
        assertEquals(newId, book.getId(), "ID should be correctly set and retrieved.");
    }
    
    
    /**
     * Testet das Setzen und Abrufen des Lesestatus des Buches.
     */
    @Test
    @DisplayName("Should set and get Status correctly")
    void testSetAndGetStatus() {
        String newStatus = "Read";
        book.setStatus(newStatus);
        assertEquals(newStatus, book.getStatus(), "Status should be correctly set and retrieved.");
    }

}
