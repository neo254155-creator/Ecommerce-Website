package com.SpringStore.Ecommerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.SpringStore.Ecommerce.Repository.OrdersRepository;
import com.SpringStore.Ecommerce.Repository.Orders_ItemRepository;
import com.SpringStore.Ecommerce.Repository.ProductsRepository;
import com.SpringStore.Ecommerce.dto.CartItemResponseDto;
import com.SpringStore.Ecommerce.dto.OrderItemResponseDto;
import com.SpringStore.Ecommerce.entity.Order_Item;
import com.SpringStore.Ecommerce.entity.Orders;
import com.SpringStore.Ecommerce.entity.Products;

@Service
public class OrderItemServiceImpl implements OrderItemService {
	public OrdersRepository ordersRepository;
	public Orders_ItemRepository ordersItemRepository;
	public ProductsRepository productsRepository;
	public ModelMapper modelMapper;
 public OrderItemServiceImpl(OrdersRepository ordersRepository,Orders_ItemRepository ordersItemRepository,ProductsRepository productsRepository,ModelMapper modelMapper) {
	this.ordersRepository=ordersRepository;
	this.ordersItemRepository=ordersItemRepository;
	this.productsRepository=productsRepository;
	this.modelMapper=modelMapper;
}
	@Override
	
	
	public List<OrderItemResponseDto> OrderSummary(Long orderId) {
		Orders order= ordersRepository.findById(orderId)
				.orElseThrow(() -> new IllegalArgumentException("No orders found for this user: " + orderId));
		List<Order_Item> orderItem=ordersItemRepository.findByOrderId(order.getId());
		return orderItem.stream()
				.map(item -> {
				OrderItemResponseDto dto = new OrderItemResponseDto();
					dto.setProductId(item.getProduct().getId());
					dto.setProductName(item.getProduct().getName());
					dto.setQuantity(item.getQuantity());
				
					return dto;
	            })
	            .collect(Collectors.toList());
	}

}
