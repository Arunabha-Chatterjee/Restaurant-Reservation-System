package com.example.testybite.service;

import com.example.testybite.model.Category;
import com.example.testybite.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    public Category addCategory(Category category){
        Optional<Category> existing = categoryRepository.findByNameIgnoreCase(category.getName());

        if (existing.isPresent()) {
            throw new RuntimeException("Category already exists with name: " + category.getName());
        }

        return categoryRepository.save(category);
    }

    public List<Category> getAllCategory(){
        return categoryRepository.findAll();
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Category with ID " + id + " not found."));
        categoryRepository.delete(category);
    }

}
