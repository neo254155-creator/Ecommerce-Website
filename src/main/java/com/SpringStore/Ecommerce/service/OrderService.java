package com.SpringStore.Ecommerce.service;

import com.SpringStore.Ecommerce.dto.OrderRequestDto;
import com.SpringStore.Ecommerce.dto.OrderResponseDto;

public interface OrderService {

    OrderResponseDto placeOrder(Long userId);

    OrderResponseDto placeOrder(Long userId, OrderRequestDto orderRequestDto);
}
