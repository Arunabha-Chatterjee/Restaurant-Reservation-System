package com.example.testybite.controller;

import com.example.testybite.dto.BookingRequestDTO;
import com.example.testybite.model.Order;
import com.example.testybite.model.Users;
import com.example.testybite.repository.UserRepository;
import com.example.testybite.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@CrossOrigin
public class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    UserRepository userRepository;

    @PostMapping("/checkout")
    public ResponseEntity<?> placeOrder(Principal principal, @RequestBody BookingRequestDTO bookingRequestDTO){
        Users user = userRepository.findByUsername(principal.getName())
                        .orElseThrow(()-> new RuntimeException("User not found"));

        return ResponseEntity.ok().body(orderService.placeOrder(user, bookingRequestDTO));
    }

    @GetMapping("/userOrders")
    public ResponseEntity<?> userOrders(Principal principal){
        Users user = userRepository.findByUsername(principal.getName())
                .orElseThrow(()-> new RuntimeException("User not found"));

        return ResponseEntity.ok().body(orderService.getOrderByUser(user));

    }

    @PutMapping("/update-order/{id}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable long id,
                                               @RequestParam String status){
        orderService.updateOrderStatus(id, status);

        return ResponseEntity.ok("Order Status Updated");
    }


    @GetMapping("/allOrders")
    public ResponseEntity<?> allOrders(){
        return ResponseEntity.ok().body(orderService.getAllOrders());
    }

}
