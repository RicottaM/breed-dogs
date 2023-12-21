package com.example.Dogs.Dog;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

@Data
public class DogCreateUpdateDTO implements Serializable {

    private String name;
    private int age;
    private UUID breed;

    public DogCreateUpdateDTO() {

    }

    @Builder
    public DogCreateUpdateDTO(String name, int age, UUID breed) {
        this.name = name;
        this.age = age;
        this.breed = breed;
    }
}
