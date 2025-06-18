package com.example.testybite.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.core.io.Resource;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
        private long id;
        private String name;
        private String description;
        private double price;
        private String category;
        private String keywords;
}
