package com.example.Breeds.Breed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/breeds")
public class BreedController {

    private final BreedService breedService;

    @Autowired
    public BreedController(BreedService breedService) {
        this.breedService = breedService;
    }

    @PostMapping
    public ResponseEntity<BreedReadDTO> createBreed(@RequestBody BreedCreateUpdateDTO breedDTO) {
        try {
            System.out.println(breedDTO);
            Breed createdBreed = breedService.createBreed(breedDTO);
            System.out.println(createdBreed);
            BreedReadDTO breedReadDTO = BreedReadDTO.fromEntity(createdBreed);
            return ResponseEntity.created(new URI("/breeds/" + createdBreed.getId())).body(breedReadDTO);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BreedReadDTO> getBreedById(@PathVariable UUID id) {
        try {
            Breed breed = breedService.getBreedById(id);
            if (breed != null) {
                BreedReadDTO breedReadDTO = BreedReadDTO.fromEntity(breed);
                return ResponseEntity.ok(breedReadDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<BreedReadDTO>> getAllBreeds() {
        try {
            List<BreedReadDTO> breeds = BreedReadDTO.fromEntities(breedService.getAllBreeds());
            return ResponseEntity.ok(breeds);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<BreedReadDTO> updateBreed(@PathVariable UUID id, @RequestBody BreedCreateUpdateDTO breedDTO) {
        try {
            Breed updatedBreed = breedService.updateBreed(id, breedDTO);
            if (updatedBreed != null) {
                BreedReadDTO breedReadDTO = BreedReadDTO.fromEntity(updatedBreed);
                return ResponseEntity.ok(breedReadDTO);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBreed(@PathVariable UUID id) {
        try {
            if (breedService.deleteBreed(id)) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
