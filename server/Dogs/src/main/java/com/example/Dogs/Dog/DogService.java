package com.example.Dogs.Dog;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Iterator;
import java.util.List;
import java.util.UUID;

@Service
public class DogService {
    @Autowired
    private RestTemplate restTemplate;
    private final DogRepository dogRepository;

    @Autowired
    public DogService(DogRepository dogRepository) {
        this.dogRepository = dogRepository;
    }

    public List<Dog> getAllDogs() {
        return dogRepository.findAll();
    }

    public void saveDog(Dog dog) {
        dogRepository.save(dog);
    }

    public void deleteDog(Dog dog) {
        dogRepository.delete(dog);
    }

    public void deleteById(UUID id) { dogRepository.deleteById(id); }

    public List<Dog> findByName(String name) {
        return dogRepository.findByName(name);
    }

    public List<Dog> findByBreed(UUID breed) {
        return dogRepository.findByBreed(breed);
    }

    @Transactional
    public void deleteDogByName(String name) {
        dogRepository.deleteByName(name);
    }

    @Transactional
    public void deleteDogsByBreedId(UUID breedId) {
        List<Dog> dogsToDelete = dogRepository.findByBreed(breedId);
        Iterator<Dog> iterator = dogsToDelete.iterator();

        while (iterator.hasNext()) {
            Dog dog = iterator.next();
            dogRepository.delete(dog);
            iterator.remove();  // Usunięcie elementu przy użyciu iteratora
        }
    }

    public Dog createDog(DogCreateUpdateDTO dogDTO) {
        Dog dog = Dog.builder()
                .name(dogDTO.getName())
                .age(dogDTO.getAge())
                .breed(dogDTO.getBreed())
                .build();

        return dogRepository.save(dog);
    }

    public Dog getDogById(UUID id) {
        return dogRepository.findById(id);
    }

    public Dog updateDog(UUID id, DogCreateUpdateDTO dogDTO) {
        Dog existingDog = dogRepository.findById(id);

        if (existingDog != null) {
            existingDog.setName(dogDTO.getName());
            existingDog.setAge(dogDTO.getAge());
            return dogRepository.save(existingDog);
        }

        return null;
    }

    @Transactional
    public boolean deleteDog(UUID id) {
        Dog existingDog = dogRepository.findById(id);

        if (existingDog != null) {
            dogRepository.delete(existingDog);
            return true;
        }

        return false;
    }

    public boolean doesBreedExist(UUID breedId) {
        try {
            ResponseEntity<String> response = restTemplate.getForEntity("http://localhost:8081/breeds/" + breedId, String.class);
            return response.getStatusCode() == HttpStatus.OK;
        } catch (HttpClientErrorException.NotFound e) {
            return false;
        }
    }

}
