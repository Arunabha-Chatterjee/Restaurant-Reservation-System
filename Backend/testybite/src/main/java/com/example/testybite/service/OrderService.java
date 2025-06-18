package com.example.testybite.service;

import com.example.testybite.dto.BookingRequestDTO;
import com.example.testybite.dto.OrderDto;
import com.example.testybite.dto.OrderItemDto;
import com.example.testybite.model.*;
import com.example.testybite.repository.CartRepository;
import com.example.testybite.repository.OrderItemRepository;
import com.example.testybite.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrderService {

    @Autowired
    CartRepository cartRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    CartService cartService;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    TableSlotService tableSlotService;

    public String placeOrder(Users user, BookingRequestDTO bookingRequestDTO){

        List<Cart> cartList = cartRepository.findByUser(user);
        // If cart is empty, return a message
        if (cartList.isEmpty()) {
            return "Cannot place order: Cart is empty!";
        }

        TableSlot bookedSlot = tableSlotService.bookTable(bookingRequestDTO);
        //if bookedSlot is empty
        if (bookedSlot == null) {
            return "Cannot place order: Table booking failed.";
        }


        Order order = new Order();

        List<OrderItem> orderItemList= new ArrayList<>();

        for (Cart cart : cartList){
            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setUser(cart.getUser());
            orderItem.setProduct(cart.getProduct());
            orderItem.setQuantity(cart.getQuantity());

            orderItemList.add(orderItem);
        }
        order.setOrderDateTime(LocalDateTime.now());
        order.setOrderItemList(orderItemList);
        order.setUser(user);
        order.setStatus("Placed");
        order.setTotalPrice(cartService.totalPrice(user));

        order.setTime(bookingRequestDTO.getTime());
        order.setDate(bookingRequestDTO.getDate());
        order.setTotalPerson(bookingRequestDTO.getNumberOfPeople());

        orderRepository.save(order);
        cartService.clearCart(user);

        return "Order Saved Successfully with ID: " + order.getId();
    }

    public List<OrderDto> getOrderByUser(Users user){
        List<Order> orderList = orderRepository.findByUser(user);

        List<OrderDto> orderDtoList = new ArrayList<>();

        for(Order order: orderList){
            OrderDto orderDto = new OrderDto();
            orderDto.setId(order.getId());
            orderDto.setOrderDateTime(order.getOrderDateTime());
            orderDto.setDate(order.getDate());
            orderDto.setTime(order.getTime());
            orderDto.setStatus(order.getStatus());
            orderDto.setTotalPrice(order.getTotalPrice());
            orderDto.setTotalPerson(order.getTotalPerson());

            List<OrderItemDto> orderItemDtoList = new ArrayList<>();
            for (OrderItem orderItem : order.getOrderItemList()){
                OrderItemDto orderItemDto = new OrderItemDto();
                orderItemDto.setId(orderItem.getId());
                orderItemDto.setProduct(orderItem.getProduct());
                orderItemDto.setQuantity(orderItem.getQuantity());

                orderItemDtoList.add(orderItemDto);
            }
            orderDto.setOrderItemDtoList(orderItemDtoList);
            orderDtoList.add(orderDto);
        }
        return orderDtoList;
    }

    public Order updateOrderStatus(long id, String status){
        Order order = orderRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Order not found"));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    public List<OrderDto> getAllOrders(){
        List<Order> orderList = orderRepository.findAll();

        List<OrderDto> orderDtoList = new ArrayList<>();

        for(Order order: orderList){
            OrderDto orderDto = new OrderDto();
            orderDto.setId(order.getId());
            orderDto.setOrderDateTime(order.getOrderDateTime());
            orderDto.setDate(order.getDate());
            orderDto.setTime(order.getTime());
            orderDto.setStatus(order.getStatus());
            orderDto.setTotalPrice(order.getTotalPrice());
            orderDto.setTotalPerson(order.getTotalPerson());

            List<OrderItemDto> orderItemDtoList = new ArrayList<>();
            for (OrderItem orderItem : order.getOrderItemList()){
                OrderItemDto orderItemDto = new OrderItemDto();
                orderItemDto.setId(orderItem.getId());
                orderItemDto.setProduct(orderItem.getProduct());
                orderItemDto.setQuantity(orderItem.getQuantity());

                orderItemDtoList.add(orderItemDto);
            }
            orderDto.setOrderItemDtoList(orderItemDtoList);
            orderDtoList.add(orderDto);
        }
        return orderDtoList;
    }
}
