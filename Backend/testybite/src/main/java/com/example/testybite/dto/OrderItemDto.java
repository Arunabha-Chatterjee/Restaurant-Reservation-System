package com.example.testybite.dto;

import com.example.testybite.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderItemDto {

    private long id;

    private Product product;

    private int quantity;
}
