package com.example.testybite.service;

import com.example.testybite.dto.AuthRequestDto;
import com.example.testybite.dto.AuthResponseDTO;
import com.example.testybite.model.Users;
import com.example.testybite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    // Inject AuthenticationManager to handle login/authentication logic
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtService jwtService;

    // Method to register a new user
    public String register(Users user){
        // Encode (hash) the password before saving to DB
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
        return "User registered successfully!";
    }

    // Method to authenticate user and generate JWT token
    public AuthResponseDTO authenticateAndGetToken(AuthRequestDto authRequestDto){
        // Perform authentication using Spring Security's AuthenticationManager
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequestDto.getUsername(),
                        authRequestDto.getPassword()
                )
        );

        // Fetch the user details from the database using the username
        Users user = userRepository.findByUsername(authRequestDto.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Generate JWT token using the username
        String token = jwtService.generateToken(user.getUsername());

        // Extract role names from user's roles (List<Role> to List<String>)
        List<String> rolesName = user.getRole()
                .stream()
                .map(role-> role.getName())
                .toList();

        // Return token and roles in a custom DTO
        return new AuthResponseDTO(token, rolesName, user.getName());
    }
}
