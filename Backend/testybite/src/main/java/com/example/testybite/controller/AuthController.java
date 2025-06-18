package com.example.testybite.controller;

import com.example.testybite.dto.AuthRequestDto;
import com.example.testybite.model.Users;
import com.example.testybite.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class AuthController {

    @Autowired
    AuthService authService;


    // Endpoint to handle user registration
    @PostMapping("/register")
    public String register(@RequestBody Users user) {
        return authService.register(user);
    }

    // Endpoint to handle login and return JWT token
    @PostMapping("/login")
    public ResponseEntity<?> authenticateAndGetToken(@RequestBody AuthRequestDto authRequestDto) {
        try {
            return ResponseEntity.ok(authService.authenticateAndGetToken(authRequestDto));

        } catch (Exception e) {
            // Return 401 Unauthorized if authentication fails
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}
