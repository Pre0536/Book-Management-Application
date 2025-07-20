package bookmanagementtool.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import bookmanagementtool.exception.AuthorNotFoundException;
import bookmanagementtool.model.Author;
import bookmanagementtool.repository.AuthorRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/author")
public class AuthorController {

    @Autowired
    private AuthorRepository authorRepository;

    /**
     * Neuen Autor erstellen.
     */
    @PostMapping("")
    public ResponseEntity<Author> addNewAuthor(@Valid @RequestBody Author author) {
        Author savedAuthor = authorRepository.save(author);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAuthor);
    }

    /**
     * Alle Autoren abrufen.
     */
    @GetMapping("")
    public ResponseEntity<Iterable<Author>> getAllAuthors() {
        return ResponseEntity.ok(authorRepository.findAll());
    }

    /**
     * Autor anhand der ID abrufen.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable("id") Integer id) {
        return authorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new AuthorNotFoundException("Autor mit dieser ID wurde nicht gefunden: " + id));
    }

    /**
     * Autor aktualisieren.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Author> updateAuthor(
            @PathVariable("id") Integer id,
            @Valid @RequestBody Author authorDetails) {

        return authorRepository.findById(id)
                .map(author -> {
                    author.setName(authorDetails.getName());
                    Author updatedAuthor = authorRepository.save(author);
                    return ResponseEntity.ok(updatedAuthor);
                })
                .orElseThrow(() -> new AuthorNotFoundException("Autor mit dieser ID wurde nicht gefunden: " + id));
    }

    /**
     * Autor löschen (inkl. aller Bücher).
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAuthor(@PathVariable("id") Integer id) {
        if (!authorRepository.existsById(id)) {
            throw new AuthorNotFoundException("Autor mit dieser ID wurde nicht gefunden: " + id);
        }

        authorRepository.deleteById(id);
        return ResponseEntity.ok("Autor wurde erfolgreich gelöscht.");
    }
}
