package com.example.testybite.service;

import com.example.testybite.model.Cart;
import com.example.testybite.model.Product;
import com.example.testybite.model.Users;
import com.example.testybite.repository.CartRepository;
import com.example.testybite.repository.ProductRepository;
import com.example.testybite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CartRepository cartRepository;

    public Cart addToCart (Users user, Long productId, int quantity){


        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new RuntimeException("Product not found"));

        //check if item already present to cart the logged user
        Optional<Cart> existingCartItem = cartRepository.findByUserAndProduct(user, product);



        //if item present just update the quantity
        if (existingCartItem.isPresent()) {
            Cart cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + quantity); // Update quantity
            return cartRepository.save(cartItem);
        }


        //if item not present in cart insert new
        Cart cartItem = new Cart();
        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartRepository.save(cartItem);
    }

    public List<Cart> viewCart (Users user){

        return cartRepository.findByUser(user);
    }

    public double totalPrice(Users user){

        List<Cart> cartList = cartRepository.findByUser(user);

        double totalPrice = 0.0;

        for (Cart cart : cartList){
            totalPrice += (cart.getQuantity() * cart.getProduct().getPrice());
        }
        return totalPrice;
    }

    public void clearCart(Users user) {

        List<Cart> cartList = cartRepository.findByUser(user);
        cartRepository.deleteAll(cartList); // deletes all cart items for that user
    }


}
