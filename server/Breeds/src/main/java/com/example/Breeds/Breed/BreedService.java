package com.example.Breeds.Breed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@Service
public class BreedService {

    private final BreedRepository breedRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    public BreedService(BreedRepository breedRepository, RestTemplate restTemplate) {
        this.breedRepository = breedRepository;
        this.restTemplate = restTemplate;
    }

    @Transactional
    public List<Breed> getAllBreeds() {
        return breedRepository.findAll();
    }

    @Transactional
    public Breed getBreedById(UUID id) {
        return breedRepository.findById(id);
    }

    public void saveBreed(Breed breed) {
        breedRepository.save(breed);
    }

    public Breed getBreedByName(String name) {
        return breedRepository.findByName(name);
    }

    @Transactional
    public Breed createBreed(BreedCreateUpdateDTO breedDTO) {
        Breed newBreed = Breed.builder()
                .name(breedDTO.getName())
                .averageAge(breedDTO.getAverageAge())
                .build();

        Breed savedBreed = breedRepository.save(newBreed);

        return savedBreed;
    }

    @Transactional
    public Breed updateBreed(UUID id, BreedCreateUpdateDTO breedDTO) {
        Breed existingBreed = breedRepository.findById(id);

        if (existingBreed != null) {
            existingBreed.setName(breedDTO.getName());
            existingBreed.setAverageAge(breedDTO.getAverageAge());

            Breed updatedBreed = breedRepository.save(existingBreed);

            return updatedBreed;
        }

        return null;
    }

    @Transactional
    public boolean deleteBreed(UUID id) {
        Breed existingDog = breedRepository.findById(id);

        if (existingDog != null) {
            breedRepository.delete(existingDog);
            restTemplate.postForEntity("http://localhost:8082/dogs/breed-deleted", id, Void.class);
            return true;
        }

        return false;
    }
}
