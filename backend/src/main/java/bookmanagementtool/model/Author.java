package bookmanagementtool.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "author")
@JsonIgnoreProperties("books")
public class Author {
	

		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Integer id;
		
		@NotBlank(message = "Feld darf nicht leer sein.")
		@Size(min = 5, max = 50, message = "Feld muss mindestens 5 Zeichen und maximal 50 Zeichen gross sein.")
		private String name;
		
		@OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
		@JsonManagedReference
		private List<Book> books = new ArrayList<>();

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public List<Book> getBooks() {
			return books;
		}

		public void setBooks(List<Book> books) {
			this.books = books;
		}
		
		// Buch auch löschen, wenn autor gelöscht wird
		public void addBook(Book book) {
			books.add(book);
			book.setAuthor(this);
		}
		
		public void removeBook(Book book) {
			books.remove(book);
			book.setAuthor(null);
		}
	}
