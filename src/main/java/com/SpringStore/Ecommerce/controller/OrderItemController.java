package com.SpringStore.Ecommerce.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringStore.Ecommerce.dto.OrderItemResponseDto;
import com.SpringStore.Ecommerce.dto.OrderRequestDto;
import com.SpringStore.Ecommerce.dto.OrderResponseDto;
import com.SpringStore.Ecommerce.service.OrderItemService;
import com.SpringStore.Ecommerce.service.OrderService;

@RestController
@RequestMapping("/api/orderItem")
public class OrderItemController {
    public final OrderItemService orderItemService;
    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }
    @GetMapping("/{order}")
    public ResponseEntity<List<OrderItemResponseDto>> OrderSummary(@PathVariable  Long  orderId ){
    	return ResponseEntity.ok(orderItemService.OrderSummary(orderId));  
    			}

}
