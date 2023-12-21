    package com.example.Dogs.Dog;

    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import jakarta.persistence.*;

    import java.io.Serializable;
    import java.util.UUID;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    @Table(name = "dogs")
    public class Dog implements Serializable {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private UUID id;

        @Column(name = "name")
        private String name;

        @Column(name = "age")
        private int age;

        @Column(name = "breed_id")
        private UUID breed;

        @Override
        public String toString() {
            return "Dog{" +
                    "id=" + id +
                    ", name='" + name + '\'' +
                    ", age=" + age +
                    '}';
        }
    }
