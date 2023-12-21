package com.example.Breeds.Breed;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
@Builder
public class BreedReadDTO implements Serializable {

    private UUID id;
    private String name;
    private int averageAge;

    @Builder
    public BreedReadDTO(UUID id, String name, int averageAge) {
        this.id = id;
        this.name = name;
        this.averageAge = averageAge;
    }

    public static BreedReadDTO fromEntity(Breed breed) {
        return new BreedReadDTO(breed.getId(), breed.getName(), breed.getAverageAge());
    }

    public static List<BreedReadDTO> fromEntities(List<Breed> breeds) {
        return breeds.stream()
                .map(BreedReadDTO::fromEntity)
                .collect(Collectors.toList());
    }
}
