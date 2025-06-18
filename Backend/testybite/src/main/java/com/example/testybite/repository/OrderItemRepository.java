package com.example.testybite.repository;

import com.example.testybite.model.OrderItem;
import com.example.testybite.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
