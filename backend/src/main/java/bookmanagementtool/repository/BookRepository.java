package bookmanagementtool.repository;

import org.springframework.data.repository.CrudRepository;

import bookmanagementtool.model.Book;

/**
 * Repository-Schnittstelle für den Zugriff auf und die Verwaltung von Buchdaten in der Datenbank.
 * Erweitert {@link CrudRepository}, um grundlegende CRUD-Operationen (Create, Read, Update, Delete)
 * für die {@link Book}-Entität bereitzustellen.
 * Der zweite generische Parameter {@code Integer} gibt den Typ des Primärschlüssels der {@link Book}-Entität an.
 */
public interface BookRepository extends CrudRepository<Book, Integer> {
	
	/**
	 * Zählt die Anzahl der Bücher, die einen bestimmten Lesestatus haben.
	 * Spring Data JPA generiert automatisch die Implementierung dieser Methode
	 * basierend auf dem Methodennamen.
	 *
	 * @param status Der Lesestatus, nach dem gezählt werden soll (z.B. "read", "currentlyReading", "wishlist").
	 * @return Die Anzahl der Bücher mit dem angegebenen Status.
	 */
	long countByStatus(String status);
}	
	
