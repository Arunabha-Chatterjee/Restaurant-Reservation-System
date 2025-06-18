package com.example.testybite.repository;

import com.example.testybite.model.Order;
import com.example.testybite.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(Users user);
}
