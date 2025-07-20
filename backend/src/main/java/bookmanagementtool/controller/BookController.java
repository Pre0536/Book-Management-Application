package bookmanagementtool.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import bookmanagementtool.exception.BookNotFoundException; // Import hinzufügen
import bookmanagementtool.exception.AuthorNotFoundException;
import bookmanagementtool.exception.BookNotFoundException;
import bookmanagementtool.model.Author;
import bookmanagementtool.model.Book;
import bookmanagementtool.model.Details;
import bookmanagementtool.repository.BookRepository;
import bookmanagementtool.repository.AuthorRepository;
import bookmanagementtool.repository.DetailsRepository;

import jakarta.validation.Valid;

/**
 * REST-Controller für die Verwaltung von Büchern in der Buchverwaltungsanwendung.
 * <p>
 * Dieser Controller stellt Endpunkte für CRUD-Operationen (Create, Read, Update, Delete)
 * für Bücher und deren Details bereit. Er interagiert mit {@link BookRepository} und
 * {@link DetailsRepository}, um Daten aus der Datenbank abzurufen und zu speichern.
 * </p>
 * <p>
 * Alle Endpunkte unter diesem Controller sind unter dem Basispfad "/book" erreichbar.
 * </p>
 */

//Markiert diese Klasse als Spring REST-Controller


@RestController
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private DetailsRepository detailsRepository;
    
    @Autowired 
    private AuthorRepository authorRepository;

    /**
     * Neues Buch hinzufügen.
     */
    @PostMapping("")
    public ResponseEntity<Book> addNewBook(@Valid @RequestBody Book book) {

        // Prüfung: Author-Referenz muss vorhanden sein
        if (book.getAuthor() == null || book.getAuthor().getId() == null) {
            return ResponseEntity.badRequest().body(null);
        }

        // Überprüfen, ob der Autor in der Datenbank existiert
        authorRepository.findById(book.getAuthor().getId())
                .orElseThrow(() -> new AuthorNotFoundException("Autor mit dieser ID wurde nicht gefunden: " + book.getAuthor().getId()));
        
        // Bidirektionale Verknüpfung der Details (falls vorhanden)
        if (book.getDetails() != null) {
            book.getDetails().setBook(book);
        }

        Book savedBook = bookRepository.save(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }

    /**
     * Alle Bücher abrufen.
     */
    @GetMapping("")
    public ResponseEntity<Iterable<Book>> getAllBooks() {
        return ResponseEntity.ok(bookRepository.findAll());
    }

    /**
     * Buch nach ID abrufen.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable("id") Integer id) {
        return bookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new BookNotFoundException("Buch mit dieser ID wurde nicht gefunden: " + id));
    }

    /**
     * Buch nach ID löschen.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable("id") Integer id) {
        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("Buch mit dieser ID wurde nicht gefunden: " + id); 
        }
        bookRepository.deleteById(id);
        return ResponseEntity.ok("Buch erfolgreich gelöscht.");
    }
    /**
     * Buch aktualisieren.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(
        @PathVariable Integer id,
        @RequestBody Book updatedBook
    ) {
        return bookRepository.findById(id)
            .map(book -> {
                // Nur Felder aktualisieren, keine komplexen Objekte
                book.setTitle(updatedBook.getTitle());
                book.setGenre(updatedBook.getGenre());
                book.setCover(updatedBook.getCover());
                book.setStatus(updatedBook.getStatus());
                
                // Autor per ID setzen (falls geändert)
                if (updatedBook.getAuthor() != null && updatedBook.getAuthor().getId() != null) {
                   
                    authorRepository.findById(updatedBook.getAuthor().getId())
                    .orElseThrow(() -> new AuthorNotFoundException("Autor mit dieser ID wurde nicht gefunden: " + updatedBook.getAuthor().getId()));
                	
                	Author author = new Author();
                    author.setId(updatedBook.getAuthor().getId());
                    book.setAuthor(author);
                }
                
                return ResponseEntity.ok(bookRepository.save(book));
            })
            .orElseThrow(() -> new BookNotFoundException("Buch mit dieser ID wurde nicht gefunden: " + id));
    }

    /**
     * Details zu einem Buch hinzufügen.
     */
    @PostMapping("/{bookId}/details")
    public ResponseEntity<Details> addDetailsToBook(@PathVariable Integer bookId, @Valid @RequestBody Details details) {
        Optional<Book> bookOpt = bookRepository.findById(bookId);

        if (bookOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Book book = bookOpt.get();

        details.setBook(book);
        book.setDetails(details);

        detailsRepository.save(details);
        bookRepository.save(book);

        return ResponseEntity.status(HttpStatus.CREATED).body(details);
    }

    /**
     * Details eines Buchs abrufen.
     */
    @GetMapping("/{bookId}/details")
    public ResponseEntity<Details> getBookDetails(@PathVariable Integer bookId) {
        Optional<Book> bookOpt = bookRepository.findById(bookId);

        if (bookOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Details details = bookOpt.get().getDetails();

        if (details == null) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

        return ResponseEntity.ok(details);
    }
}