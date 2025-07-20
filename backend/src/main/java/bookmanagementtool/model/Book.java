package bookmanagementtool.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;


/**
 * Repräsentiert ein Buch in der Buchverwaltungsanwendung.
 * Diese Klasse ist ein JPA-Entität und wird einer Datenbanktabelle zugeordnet.
 * Sie enthält Felder für die grundlegenden Eigenschaften eine Buches
 * sowie Validierungsregeln für diese Felder.
 */
@Entity
@Table(name = "book")
public class Book {
	
	/**
	 * Die eindeutige ID des Buches.
	 * Dies ist der Primärschlüssel der Datenbanktabelle und wird automatisch 
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

	/**
	 * Der Titel des Buches.
	 * 
	 * {@code @NotBlank}: Stellt sicher, dass der Titel nicht null ist und mindestens ein nicht-Whitespace-Zeichen enthält.
	 * 
	 * {@code @Size}: Begrenzt die Länge des Titels auf maximal 100 Zeichen.
	 */
	@NotBlank(message = "Feld darf nicht leer sein.")
	@Size(min = 5, max = 100, message = "Feld muss mindestens 5 Zeichen und maximal 50 Zeichen gross sein.")
    private String title;
	

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "author_id", nullable = false)
	@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
	private Author author;
	

	/**
	 * Das Genre des Buches (" XXXX,XXX)
	 * 
	 * {@code @NotBlank}: Stellt sicher, dass das Genre nicht null ist und mindestens ein nicht-Whitespace-Zeichen enthält.
	 */
	@NotBlank(message = "Genre cannot be blank.")
    private String genre;
	
	/**
	 * Den Einband des Buches ("Hardcover", Softcover, ebook)
	 * 
	 * {@code @NotBlank}: Stellt sicher, dass das Cover nicht null ist und mindestens ein nicht-Whitespace-Zeichen enthält.
	 */
	@NotBlank(message = "Feld darf nicht leer sein.")	
    private String cover;
	
	/**
	 * Der Lesestatus des Buches (z.B. "read", "currentlyReading", "wishlist").
	 * {@code @NotBlank}: Stellt sicher, dass der Status nicht null ist und mindestens ein nicht-Whitespace-Zeichen enthält.
	 * 
	 */
	@NotBlank(message = "Feld darf nicht leer sein.")
    private String status;
	
	@OneToOne(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
	private Details details;
	
	// Getter und Setter
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	

	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public Author getAuthor() {
		return author;
	}
	
	public void setAuthor(Author author) {
		this.author = author;
	}
	
	public String getGenre() {
		return genre;
	}
	
	public void setGenre(String genre) {
		this.genre = genre;
	}
	
	public String getCover() {
		return cover;
	}
	
	public void setCover(String cover) {
		this.cover = cover;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
	}

	public Details getDetails() {
		return details;
	}

	public void setDetails(Details details) {
		this.details = details;
	}


	
	
	
}

