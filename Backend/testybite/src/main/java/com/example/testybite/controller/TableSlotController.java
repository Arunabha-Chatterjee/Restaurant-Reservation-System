package com.example.testybite.controller;

import com.example.testybite.dto.BookingRequestDTO;
import com.example.testybite.model.TableSlot;
import com.example.testybite.repository.TableSlotRepository;
import com.example.testybite.service.TableSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
public class TableSlotController {

    @Autowired
    TableSlotService tableSlotService;

    @PostMapping("admin/add-table")
    public ResponseEntity<?> addTable(@RequestBody TableSlot tableSlot) {
        try {
            TableSlot savedSlot = tableSlotService.addTable(tableSlot);
            return ResponseEntity.ok(savedSlot);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("slot-by-date")
    public ResponseEntity<?> getSlotByDate(LocalDate date){
        List<TableSlot> tableSlots = tableSlotService.getSlotByDate(date);
        return ResponseEntity.ok(tableSlots);
    }

    @GetMapping("/get-all-table")
    public List<TableSlot> getAllTableSlot(){
        return tableSlotService.getAllTableSlot();
    }

    @PostMapping("/book-table")
    public TableSlot bookTable(@RequestBody BookingRequestDTO request) {
        return tableSlotService.bookTable(request);
    }

    @DeleteMapping("/admin/delete-table/{id}")
    public ResponseEntity<?> deleteTableSlot(@PathVariable Long id) {
        try {
            tableSlotService.deleteTableSlot(id);
            return ResponseEntity.ok("Table slot deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
