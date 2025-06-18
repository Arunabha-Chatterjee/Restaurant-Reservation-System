package com.example.testybite.repository;

import com.example.testybite.model.TableSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TableSlotRepository extends JpaRepository<TableSlot,Long> {

    TableSlot findByDateAndTime(LocalDate date, LocalTime time);

    List<TableSlot> findByDate(LocalDate date);

    TableSlot findById(long id);
}
