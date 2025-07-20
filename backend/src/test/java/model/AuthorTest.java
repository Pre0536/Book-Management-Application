package model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import bookmanagementtool.model.Author;
import bookmanagementtool.model.Book;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class AuthorTest {
	
    private Author author;
    private Book book1;
    private Book book2;

    /**
     * Diese Methode wird vor jedem Test ausgeführt.
     * Sie initialisiert ein neues Author- und Book-Objekt,
     * um eine saubere Ausgangsbasis für jeden Test zu gewährleisten.
     */
    @BeforeEach
    void setUp() {
        author = new Author();
        author.setId(1);
        author.setName("J. K. Rowling");

        book1 = new Book();
        book1.setId(21);
        book1.setTitle("Harry Potter und der Orden des Phönix");
        // book1.setAuthor(author); // Wird von addBook() gesetzt

        book2 = new Book();
        book2.setId(22);
        book2.setTitle("Harry Potter und die Heiligtümer des Todes");
        // book2.setAuthor(author); // Wird von addBook() gesetzt
    }
    
    /**
     * Testet das Hinzufügen eines Buches zum Autor und die bidirektionale Verknüpfung.
     */
    @Test
    @DisplayName("Should add a book and establish bidirectional link")
    void testAddBook() {
        author.addBook(book1);

        assertEquals(1, author.getBooks().size(), "Author's book list should contain one book.");
        assertTrue(author.getBooks().contains(book1), "Author's book list should contain book1.");
        assertEquals(author, book1.getAuthor(), "Book's author should be correctly set to this author.");
    }
    
    
    /**
     * Testet das Entfernen eines Buches vom Autor und die Aufhebung der bidirektionalen Verknüpfung.
     */
    @Test
    @DisplayName("Should remove a book and break bidirectional link")
    void testRemoveBook() {
        author.addBook(book1); // Zuerst hinzufügen
        assertTrue(author.getBooks().contains(book1), "Book1 should be in author's list initially.");
        assertEquals(author, book1.getAuthor(), "Book1's author should be set initially.");

        author.removeBook(book1); // Dann entfernen

        assertTrue(author.getBooks().isEmpty(), "Author's book list should be empty after removal.");
        assertNull(book1.getAuthor(), "Book's author should be null after removal.");
    }

}
