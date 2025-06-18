package com.example.testybite.controller;

import com.example.testybite.model.AddCartRequest;
import com.example.testybite.model.Cart;
import com.example.testybite.model.Users;
import com.example.testybite.repository.UserRepository;
import com.example.testybite.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/addCart")
    public ResponseEntity<?> addItemToCart(@RequestBody AddCartRequest request, Principal principal) {
        Users user = userRepository.findByUsername(principal.getName())
                .orElseThrow(()-> new RuntimeException("User not found"));

        Cart addedItem = cartService.addToCart(user, request.getId(), request.getQuantity());
        return ResponseEntity.ok(addedItem);
    }

    @GetMapping("/getCart")
    public List<Cart> viewCart (Principal principal){
        Users user = userRepository.findByUsername(principal.getName())
                .orElseThrow(()-> new RuntimeException("User not found"));
        return cartService.viewCart(user);
    }

    @GetMapping("/getTotalPrice")
    public double getTotalPrice(Principal principal){
        Users user = userRepository.findByUsername(principal.getName())
                .orElseThrow(()-> new RuntimeException("User not found"));

        double totalPrice = cartService.totalPrice(user);
        return totalPrice;
    }
}
