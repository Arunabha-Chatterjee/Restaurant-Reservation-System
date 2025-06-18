package com.example.testybite.repository;

import com.example.testybite.model.Category;
import com.example.testybite.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByName(String name);
    Product findById(long id);

    List<Product> findByCategory (Category category);
}
