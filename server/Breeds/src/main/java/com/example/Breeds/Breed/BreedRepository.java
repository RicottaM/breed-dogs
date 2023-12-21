package com.example.Breeds.Breed;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BreedRepository extends JpaRepository<Breed, Integer> {
    Breed findByName(String name);
    Breed findById(UUID id);

    void deleteById(UUID id);
}
