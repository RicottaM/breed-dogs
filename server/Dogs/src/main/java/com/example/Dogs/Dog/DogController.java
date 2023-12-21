package com.example.Dogs.Dog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/dogs")
public class DogController {

    private final DogService dogService;

    @Autowired
    public DogController(DogService dogService) {
        this.dogService = dogService;
    }

    @PostMapping
    public ResponseEntity<DogReadDTO> createDog(@RequestBody DogCreateUpdateDTO dogDTO) {
        if (dogDTO.getBreed() != null && dogService.doesBreedExist(dogDTO.getBreed())) {
            try {
                Dog createdDog = dogService.createDog(dogDTO);
                DogReadDTO dotReadDTO = DogReadDTO.fromEntity(createdDog);
                return ResponseEntity.created(new URI("/dogs/" + createdDog.getId())).body(dotReadDTO);
            } catch (Exception e) {
                return ResponseEntity.badRequest().build();
            }
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DogReadDTO> getDogById(@PathVariable UUID id) {
        try {
            Dog dog = dogService.getDogById(id);
            if (dog != null) {
                DogReadDTO dogReadDTO = DogReadDTO.fromEntity(dog);
                return ResponseEntity.ok(dogReadDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<DogReadDTO>> getAllDogs() {
        try {
            List<DogReadDTO> dogs = DogReadDTO.fromEntities(dogService.getAllDogs());
            return ResponseEntity.ok(dogs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<DogReadDTO> updateDog(@PathVariable UUID id, @RequestBody DogCreateUpdateDTO dogDTO) {
        try {
            Dog updatedDog = dogService.updateDog(id, dogDTO);
            if (updatedDog != null) {
                DogReadDTO dogReadDTO = DogReadDTO.fromEntity(updatedDog);
                return ResponseEntity.ok(dogReadDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDog(@PathVariable UUID id) {
        try {
            if (dogService.deleteDog(id)) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/breed-deleted")
    public ResponseEntity<Void> handleAlbumDeletion(@RequestBody UUID breedId) {
        dogService.deleteDogsByBreedId(breedId);
        return ResponseEntity.ok().build();
    }

}
