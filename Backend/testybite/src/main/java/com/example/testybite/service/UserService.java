package com.example.testybite.service;

import com.example.testybite.model.Users;
import com.example.testybite.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService {
    @Autowired
    UserRepository userRepository;


    public List<Users> getAllUsers() {
        return userRepository.findAll().stream()
                .filter(user -> user.getRole().stream()
                        .anyMatch(role -> "USER".equalsIgnoreCase(role.getName())))
                .toList();
    }
}
