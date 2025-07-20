package bookmanagementtool.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import bookmanagementtool.repository.BookRepository;

/**
 * Dieser Controller liefert Statistikdaten über Bücher,
 * z. B. wie viele gelesen wurden oder noch gelesen werden sollen.
 */
@RestController
@RequestMapping("/book")
public class BookStatisticController {

    @Autowired
    private BookRepository bookRepository;

    /**
     * Gibt eine Übersicht der Bücheranzahl je Lesestatus zurück.
     * 
     * Beispielausgabe (JSON):
     * {
     *   "read": 5,
     *   "currentlyReading": 2,
     *   "wishlist": 3
     * }
     */
    @GetMapping("/statistics")
    public Map<String, Long> getBookStatistics() {
        long read = bookRepository.countByStatus("read");
        long currentlyReading = bookRepository.countByStatus("currentlyReading");
        long wishlist = bookRepository.countByStatus("wishlist");

        Map<String, Long> statistics = new HashMap<>();
        statistics.put("read", read);
        statistics.put("currentlyReading", currentlyReading);
        statistics.put("wishlist", wishlist);

        return statistics;
    }
}
