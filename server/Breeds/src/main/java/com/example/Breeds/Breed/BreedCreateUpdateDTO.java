package com.example.Breeds.Breed;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
public class BreedCreateUpdateDTO implements Serializable {
    private String name;
    private int averageAge;
    private UUID id;

    public BreedCreateUpdateDTO() {

    }
    @Builder
    public BreedCreateUpdateDTO(String name, int averageAge) {
        this.name = name;
        this.averageAge = averageAge;
    }
}
