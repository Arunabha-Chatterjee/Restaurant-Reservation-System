package com.example.testybite.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.web.WebProperties;

@NoArgsConstructor
@AllArgsConstructor
@Data

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;
    private String description;
    private String keyword;

    private String imageName;
    private String imageType;
    private String imageFilepath;

    @ManyToOne
    @JoinColumn (name = "product_category")
    private Category category;

}
