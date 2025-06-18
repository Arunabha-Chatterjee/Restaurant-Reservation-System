package com.example.testybite.service;

import com.example.testybite.dto.BookingRequestDTO;
import com.example.testybite.model.TableSlot;
import com.example.testybite.repository.TableSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class TableSlotService {

    @Autowired
    TableSlotRepository tableSlotRepository;

    public TableSlot addTable(TableSlot tableSlot) {
        LocalDate date = tableSlot.getDate();
        LocalTime time = tableSlot.getTime();

        TableSlot slot = tableSlotRepository.findByDateAndTime(date, time);

        if (slot != null) {
            throw new IllegalArgumentException("A table slot already exists for this date and time.");
        }

        return tableSlotRepository.save(tableSlot);
    }

    public List<TableSlot> getAllTableSlot(){
        return tableSlotRepository.findAll();
    }

    public List<TableSlot> getSlotByDate(LocalDate date){
        return tableSlotRepository.findByDate(date);
    }

    public TableSlot bookTable(BookingRequestDTO request) {
        TableSlot slot = tableSlotRepository
                .findByDateAndTime(request.getDate(), request.getTime());

        if (slot == null) {
            return null;
        }

        if (slot.getCapacity() < request.getNumberOfPeople()) {
            return null;
        }

        slot.setCapacity(slot.getCapacity() - request.getNumberOfPeople());
        return tableSlotRepository.save(slot);
    }

    public void deleteTableSlot(Long id) {
        Optional<TableSlot> tableSlot = tableSlotRepository.findById(id);
        if (!tableSlotRepository.existsById(id)) {
            throw new IllegalArgumentException("Table slot with ID " + id + " not found.");
        }
        tableSlotRepository.delete(tableSlot.get());
    }

}
