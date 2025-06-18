package com.example.testybite.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthResponseDTO {

    private String token;
    List<String> roles;
    private String username;
}
