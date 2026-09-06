package com.SpringStore.Ecommerce.service;




import java.util.List;
import java.util.Optional;

import com.SpringStore.Ecommerce.dto.CartItemRequestDto;
import com.SpringStore.Ecommerce.dto.CartItemResponseDto;
import com.SpringStore.Ecommerce.entity.User;

import jakarta.validation.Valid;

public interface CartService {
	List<CartItemResponseDto> getCartByUserId(Long userId);

	 CartItemResponseDto addItemToCart(Long userId, CartItemRequestDto cartItemRequestDto);

	   CartItemResponseDto updateQuantity(Long userId, @Valid CartItemRequestDto cartItemRequestDto);

	  void removeFromCart(Long userId,Long product);
	}


