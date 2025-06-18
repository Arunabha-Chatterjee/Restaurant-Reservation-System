package com.example.testybite.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class BookingRequestDTO {
    private LocalDate date;
    private LocalTime time;
    private int numberOfPeople;

}
