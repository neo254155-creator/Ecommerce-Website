package com.SpringStore.Ecommerce.service;

import java.util.List;

import com.SpringStore.Ecommerce.dto.OrderItemResponseDto;

public interface OrderItemService {
	List<OrderItemResponseDto> OrderSummary(Long orderId);
	

}
