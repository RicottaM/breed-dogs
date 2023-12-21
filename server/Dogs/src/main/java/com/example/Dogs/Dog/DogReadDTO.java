package com.example.Dogs.Dog;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Data
public class DogReadDTO implements Serializable {

    private UUID id;
    private String name;
    private int age;
    private UUID breed;

    @Builder
    public DogReadDTO(UUID id, String name, int age, UUID breed) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.breed = breed;
    }

    public static List<DogReadDTO> fromEntities(List<Dog> dogs) {
        return dogs.stream()
                .map(DogReadDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public static DogReadDTO fromEntity(Dog dog) {
        return new DogReadDTO(dog.getId(), dog.getName(), dog.getAge(), dog.getBreed());
    }
}
