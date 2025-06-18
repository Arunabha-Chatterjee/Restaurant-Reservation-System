package com.example.testybite.controller;

import com.example.testybite.dto.ProductDTO;
import com.example.testybite.model.Product;
import com.example.testybite.repository.ProductRepository;
import com.example.testybite.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    ProductRepository productRepository;

    @PostMapping("/admin/add-product")
    public ResponseEntity<?> addProduct( @RequestPart Product product,
                                         @RequestPart MultipartFile image){
        try {
            productService.addProduct(product, image);
            return ResponseEntity.ok().body("Product added successfully");
        }

        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/image/{proId}")
    public ResponseEntity<?> getProductImage(@PathVariable Long proId) throws IOException {
        Product product = productRepository.findById(proId)
                .orElseThrow(()->new RuntimeException("Product not found"));

        byte[] image = productService.getProductImage(product);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(product.getImageType()))
                .body(image);
    }

    @GetMapping("/allProducts")
    public ResponseEntity<?> getAllProducts () throws IOException {
        try {
            List<ProductDTO> productDTOList = productService.getAllProducts();
            return ResponseEntity.ok().body(productDTOList);
        }catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable Long id,
            @RequestPart("product") ProductDTO productDTO,
            @RequestPart(value = "image", required = false) MultipartFile image) {

        try {
            Product updatedProduct = productService.updateProduct(id, productDTO, image);
            return ResponseEntity.ok(updatedProduct); // You can return a custom message or DTO if preferred
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update image.");
        }
    }

    @DeleteMapping("/admin/delete/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id){
        try {
            productService.deleteProduct(id);
            return ResponseEntity.ok().body("Product Deleted Successfully");
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/by-category/products/{id}")
    public ResponseEntity<?> getProductsByCategory(@PathVariable  long id){
        List<Product> productList= productService.getProductByCategory(id);
        return ResponseEntity.ok().body(productList);
    }


}
