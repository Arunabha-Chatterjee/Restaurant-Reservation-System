package com.example.testybite.model;

public class AddCartRequest {

   private long id;
   private int quantity;

    public AddCartRequest(long id, int quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    public AddCartRequest() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
