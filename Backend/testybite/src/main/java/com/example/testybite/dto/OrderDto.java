package com.example.testybite.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDto {

    private long id;

    private LocalDateTime orderDateTime;
    private String status;

    private LocalDate date;
    private LocalTime time;
    private int totalPerson;
    private double totalPrice;

    private List<OrderItemDto> orderItemDtoList;
}
