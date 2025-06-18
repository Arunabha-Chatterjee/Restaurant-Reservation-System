package com.example.testybite.controller;

import com.example.testybite.model.Category;
import com.example.testybite.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @PostMapping("admin/addCategory")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        try {
            Category saved = categoryService.addCategory(category);
            return ResponseEntity.ok(saved);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping("admin/getAllCategory")
    public List<Category> getAllCategory(){
        return categoryService.getAllCategory();
    }

    @DeleteMapping("/admin/delete-category/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("Category deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
