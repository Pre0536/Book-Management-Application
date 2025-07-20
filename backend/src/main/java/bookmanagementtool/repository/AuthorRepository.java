package bookmanagementtool.repository;

import org.springframework.data.repository.CrudRepository;

import bookmanagementtool.model.Author;


public interface AuthorRepository extends CrudRepository<Author, Integer> {

}
