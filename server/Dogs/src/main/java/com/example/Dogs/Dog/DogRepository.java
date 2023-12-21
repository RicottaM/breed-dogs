package com.example.Dogs.Dog;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface DogRepository extends JpaRepository<Dog, Integer> {
    List<Dog> findByName(String name);
    void deleteById(UUID id);

    @Transactional
    void deleteByName(String name);

    List<Dog> findByBreed(UUID breed);

    Dog findById(UUID id);
}
