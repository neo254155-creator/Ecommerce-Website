package com.SpringStore.Ecommerce.controller;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringStore.Ecommerce.dto.CartItemRequestDto;
import com.SpringStore.Ecommerce.dto.CartItemResponseDto;
import com.SpringStore.Ecommerce.dto.CartResponseDto;
import com.SpringStore.Ecommerce.dto.CategoryRequestDto;
import com.SpringStore.Ecommerce.dto.CategoryResponseDto;
import com.SpringStore.Ecommerce.dto.ProductRequestDto;
import com.SpringStore.Ecommerce.dto.ProductResponseDto;
import com.SpringStore.Ecommerce.entity.User;
import com.SpringStore.Ecommerce.service.CartService;
import com.SpringStore.Ecommerce.service.CategoryService;
import com.SpringStore.Ecommerce.service.ProductService;
import com.SpringStore.Ecommerce.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
public class CartController {
private final CartService cartService;
public CartController(CartService cartService) {
this.cartService=cartService;

}
@GetMapping ("/{userId}")
public ResponseEntity<List<CartItemResponseDto>> getCartByUserId(@PathVariable Long userId ){
	return ResponseEntity.ok(cartService.getCartByUserId(userId));
	
} 
@PostMapping("/{userId}/items")
public ResponseEntity<CartItemResponseDto> addItemToCart(
        @PathVariable Long userId,
        @Valid @RequestBody CartItemRequestDto cartItemRequestDto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addItemToCart(userId, cartItemRequestDto));
}
@PatchMapping("/{userId}/items")
public ResponseEntity<CartItemResponseDto> upadateQuantity( @PathVariable Long userId,@Valid @RequestBody CartItemRequestDto cartItemRequestDto){
	return ResponseEntity.status(HttpStatus.CREATED).body(cartService.updateQuantity(userId,cartItemRequestDto));
	
}
@DeleteMapping("{userId}/items/{product}")
public ResponseEntity<CartItemResponseDto> removeFromCart(@PathVariable Long product,   
        @PathVariable Long userId){
	cartService.removeFromCart(userId,product);
	 return ResponseEntity.noContent().build();
	}
}