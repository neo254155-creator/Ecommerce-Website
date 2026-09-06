package com.SpringStore.Ecommerce.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringStore.Ecommerce.dto.OrderRequestDto;
import com.SpringStore.Ecommerce.dto.OrderResponseDto;
import com.SpringStore.Ecommerce.service.OrderService;

@RestController
@RequestMapping({"/api/orders", "/api/order"})
public class OrderController {
    public final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(value = {"/{userId}/items", "/{userId}"})
    public ResponseEntity<OrderResponseDto> placeOrder(
            @PathVariable Long userId,
            @RequestBody(required = false) OrderRequestDto orderRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.placeOrder(userId, orderRequestDto));
    }
}
	


