package com.example.testybite.repository;

import com.example.testybite.model.Cart;
import com.example.testybite.model.Product;
import com.example.testybite.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUserAndProduct(Users user, Product product);

    List<Cart> findByUser(Users user);

}
