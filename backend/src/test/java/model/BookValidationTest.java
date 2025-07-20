package model;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import jakarta.validation.ConstraintViolation; 

import bookmanagementtool.model.Author;
import bookmanagementtool.model.Book;
import bookmanagementtool.model.Details;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class BookValidationTest {
	
    private static Validator validator; // Der Validator, der für alle Tests verwendet wird
    private Book validBook;
    private Author validAuthor;

    /**
     * Diese Methode wird einmalig vor allen Tests ausgeführt.
     * Sie initialisiert den Validator für die Bean Validation.
     */
    @BeforeAll
    static void setUpValidator() {
        // Erstelle eine ValidatorFactory und dann den Validator
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }
    
    @BeforeEach
    void setUp() {
        // Initialisiere ein Author-Objekt für die Beziehung
        validAuthor = new Author();
        validAuthor.setId(1);
        validAuthor.setName("J. K. Rowling");


        

        // Initialisiere ein Book-Objekt mit Standardwerten
        validBook = new Book();
        validBook.setId(1);
        validBook.setTitle("Harry Potter und der Feuerkelch");
        validBook.setAuthor(validAuthor); // Setze den Author
        validBook.setGenre("Fantasy");
        validBook.setCover("Hardcover");
        validBook.setStatus("Currently Reading");
      
    }
    
    @Test
    @DisplayName("Should fail validation when title is blank or too short")
    void testInvalidTitle_BlankOrTooShort() {
    	
    // Testfall 1: Titel ist zu kurz (mindestens 5 Zeichen)
    validBook.setTitle("HP 4");
    
    Set<ConstraintViolation<Book>> violations = validator.validate(validBook);

    
    violations = validator.validate(validBook);
    assertEquals(1, violations.size(), "Expected one violation for title too short.");
    assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("Title cannot be exceed 100 characters.")), // Beachten Sie, dass die @Size-Nachricht nicht "zu kurz" sagt. Passen Sie diese ggf. in der Book-Klasse an.
               "Violation message for title too short is incorrect.");
}
    
    

}
