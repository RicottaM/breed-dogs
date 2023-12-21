package com.example.Breeds.Breed;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "breeds")
public class Breed implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;  // Użycie generacji ID przez bazę danych

    @Column(name = "name")
    private String name;

    @Column(name = "average_age")  // Przykład nadpisania nazwy kolumny
    private int averageAge;

    @Override
    public String toString() {
        return "Breed{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", averageAge=" + averageAge +
                '}';
    }
}
