package com.example.testybite.service;

import com.example.testybite.dto.ProductDTO;
import com.example.testybite.model.Category;
import com.example.testybite.model.Product;
import com.example.testybite.repository.CategoryRepository;
import com.example.testybite.repository.OrderItemRepository;
import com.example.testybite.repository.ProductRepository;
import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryService categoryService;

    @Autowired
    OrderItemRepository orderItemRepository;

    private final String FolderPath = "D:/testybite/testybite/Images";

    public Product addProduct(Product product, MultipartFile image) throws IOException {

                Product existProduct = productRepository.findByName(product.getName());
                if(existProduct!= null){
                    throw new RuntimeException("This product is already exist");
                }
                //saving the product first time for getting the product id
                Product saveProduct = productRepository.save(product);

                String storeFileName = saveProduct.getId() + System.currentTimeMillis() + image.getOriginalFilename();

                String filePath = FolderPath + "/" +storeFileName;

                saveProduct.setImageName(storeFileName);
                saveProduct.setImageType(image.getContentType());
                saveProduct.setImageFilepath(filePath);

                //store image to folder
                image.transferTo(new File(filePath));

                return productRepository.save(saveProduct);
    }

    public byte[] getProductImage (Product product) throws IOException {
        byte [] image = Files.readAllBytes(new File(product.getImageFilepath()).toPath());
        return image;
    }

    public List<ProductDTO> getAllProducts() throws IOException {
        List<Product> productList = productRepository.findAll();
        List<ProductDTO> productDTOList = new ArrayList<>();

        for (Product product : productList){
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(product.getId());
            productDTO.setName(product.getName());
            productDTO.setPrice(product.getPrice());
            productDTO.setCategory((product.getCategory().getName()));
            productDTO.setKeywords(product.getKeyword());
            productDTO.setDescription(product.getDescription());

            productDTOList.add(productDTO);
        }
        return productDTOList;
    }

    public Product updateProduct(Long id, ProductDTO productDTO, MultipartFile image) throws IOException {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new RuntimeException("Product not found");
        }

        Product product = optionalProduct.get();

        //  Check if another product with the same name exists (and it's not this product)
        Product existingByName = productRepository.findByName(productDTO.getName());
        if (existingByName != null && !existingByName.getId().equals(id)) {
            throw new RuntimeException("Another product with this name already exists");
        }

        //  Update product fields
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setKeyword(productDTO.getKeywords());

        // Update category
        Category category = categoryRepository.findByNameIgnoreCase(productDTO.getCategory()).orElse(null);
        if (category == null) {
            throw new RuntimeException("Category not found: " + productDTO.getCategory());
        }
        product.setCategory(category);

        //  Handle image if provided
        if (image != null && !image.isEmpty()) {
            // Optional: delete old image
            File oldImage = new File(product.getImageFilepath());
            if (oldImage.exists()) {
                oldImage.delete();
            }
            String storeFileName = product.getId() + System.currentTimeMillis()+ image.getOriginalFilename();
            String filePath = FolderPath + "/" + storeFileName;

            image.transferTo(new File(filePath));

            product.setImageName(storeFileName);
            product.setImageType(image.getContentType());
            product.setImageFilepath(filePath);
        }

        return productRepository.save(product);
    }

    public String deleteProduct(long id){
        Product product = productRepository.findById(id);
        File oldImage = new File(product.getImageFilepath());
        if (oldImage.exists()) {
            oldImage.delete();
        }
        
        productRepository.delete(product);
        return "Product delete successfully";
    }


    public List<Product> getProductByCategory(long id){
       Category category = categoryRepository.findById(id)
               .orElseThrow(()->new RuntimeException("Category not Found"));

       List<Product> products = productRepository.findByCategory(category);

       return products;
    }

}
