package com.example.testybite.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleController {

    @GetMapping("/user/check")
    public String check(){
        return "User Your Application work fine";
    }

    @GetMapping("/admin/check")
    public String admincheck(){
        return "Admin Your Application work fine";
    }
}
