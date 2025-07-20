package bookmanagementtool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


/**
 * Die Hauptanwendungsklasse für die Buchverwaltungsanwendung.
 * Diese Klasse ist der Einstiegspunkt für die Spring Boot-Anwendung.
 * 
 * {@code @SpringBootApplication} ist eine Convenience-Annotation, die:
 * 
 * - {@code @Configuration}: Markiert die Klasse als Konfigurationsklasse für Spring Beans.
 * - {@code @EnableAutoConfiguration}: Aktiviert die automatische Konfiguration von Spring Boot.
 * - {@code @ComponentScan}: Scannt Komponenten, Konfigurationen und Dienste im aktuellen Paket
 *   und dessen Unterpaketen.
 * 
 */
@SpringBootApplication
public class BookManagementApplication {

	/**
	 * Die Hauptmethode, die die Spring Boot-Anwendung startet.
	 *
	 * @param args Kommandozeilenargumente, die an die Anwendung übergeben werden können.
	 */
	public static void main(String[] args) {
		SpringApplication.run(BookManagementApplication.class, args);

	}

}
