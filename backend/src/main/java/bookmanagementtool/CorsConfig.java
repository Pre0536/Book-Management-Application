package bookmanagementtool;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Konfigurationsklasse zur Aktivierung und Konfiguration von Cross-Origin Resource Sharing (CORS)
 * für die Spring Boot-Anwendung.
 * 
 * {@code @Configuration} zeigt an, dass diese Klasse Bean-Definitionen enthält und eine Quelle
 * für Spring-Beans ist.
 */
@Configuration
public class CorsConfig {
	
    /**
     * Definiert eine {@link WebMvcConfigurer}-Bean, um CORS-Regeln für die Anwendung zu konfigurieren.
     * Diese Konfiguration erlaubt Anfragen von der React-Frontend-Anwendung (standardmässig auf Port 3000)
     * an alle Endpunkte des Backends.
     *
     * @return Eine Instanz von {@link WebMvcConfigurer}, die die CORS-Konfiguration bereitstellt.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
        	
            /**
             * Konfiguriert die CORS-Mappings für die Anwendung.
             * Diese Methode wird von Spring aufgerufen, um die CORS-Regeln zu registrieren.
             *
             * @param registry Das {@link CorsRegistry}-Objekt, mit dem CORS-Mappings hinzugefügt werden können.
             */
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // React-Standardport
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
