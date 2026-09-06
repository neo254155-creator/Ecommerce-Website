package com.SpringStore.Ecommerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.SpringStore.Ecommerce.Repository.CartsRepository;
import com.SpringStore.Ecommerce.Repository.Carts_ItemRepository;
import com.SpringStore.Ecommerce.Repository.ProductsRepository;
import com.SpringStore.Ecommerce.dto.CartItemRequestDto;
import com.SpringStore.Ecommerce.dto.CartItemResponseDto;
import com.SpringStore.Ecommerce.entity.Cart;
import com.SpringStore.Ecommerce.entity.Cart_Item;
import com.SpringStore.Ecommerce.entity.Products;

import jakarta.validation.Valid;

@Service
public class CartServiceImpl implements CartService {
	private final CartsRepository cartsRepository;
	private final Carts_ItemRepository cartItemRepository;
	private final ProductsRepository productsRepository;
	private final ModelMapper modelMapper;

	public CartServiceImpl(CartsRepository cartsRepository, ModelMapper modelMapper,
			Carts_ItemRepository cartItemRepository, ProductsRepository productsRepository) {
		this.cartsRepository = cartsRepository;
		this.modelMapper = modelMapper;
		this.cartItemRepository = cartItemRepository;
		this.productsRepository = productsRepository;
	}

	@Override
	public List<CartItemResponseDto> getCartByUserId(Long userId) {
		Cart cart = cartsRepository.findByUserId(userId)
				.orElseThrow(() -> new IllegalArgumentException("Cart does not exist for user: " + userId));

		List<Cart_Item> cartItem = cartItemRepository.findByCartId(cart.getId());

		return cartItem.stream()
				.map(item -> {
					CartItemResponseDto dto = new CartItemResponseDto();

					dto.setCartItemId(item.getId());
					dto.setProductId(item.getProduct().getId());
					dto.setProductName(item.getProduct().getName());
					dto.setPrice(item.getProduct().getPrice());
					dto.setQuantity(item.getQuantity());
					dto.setSubtotal(item.getProduct().getPrice() * item.getQuantity());
					return dto;
				})
				.collect(Collectors.toList());
	}

	@Override
	public CartItemResponseDto addItemToCart(@Valid Long userId, CartItemRequestDto cartItemRequestDto) {
		Cart cart = cartsRepository.findByUserId(userId)
				.orElseThrow(() -> new IllegalArgumentException("Cart does not exist for user: " + userId));
		Products product = productsRepository.findById(cartItemRequestDto.getId())
				.orElseThrow(() -> new IllegalArgumentException("Product is not available with ID: " + cartItemRequestDto.getId()));
		Cart_Item cartItem = cartItemRepository.findByCartId_IdAndProduct_Id(cart.getId(), product.getId()).orElse(null);
		if (cartItem != null) {
			cartItem.setQuantity(cartItem.getQuantity() + cartItemRequestDto.getQuantity());
		} else {
			cartItem = new Cart_Item();
			cartItem.setCart(cart);
			cartItem.setProduct(product);
			cartItem.setQuantity(cartItemRequestDto.getQuantity());
		}
		cartItem = cartItemRepository.save(cartItem);

		CartItemResponseDto dto = new CartItemResponseDto();
		dto.setCartItemId(cartItem.getId());
		dto.setProductId(product.getId());
		dto.setProductName(product.getName());
		dto.setPrice(product.getPrice());
		dto.setQuantity(cartItem.getQuantity());
		dto.setSubtotal(product.getPrice() * cartItem.getQuantity());

		return dto;
	}

	@Override
	public CartItemResponseDto updateQuantity(Long userId, @Valid CartItemRequestDto cartItemRequestDto) {
		Cart cart = cartsRepository.findByUserId(userId)
				.orElseThrow(() -> new IllegalArgumentException("Cart does not exist for user: " + userId));
		Products product = productsRepository.findById(cartItemRequestDto.getId())
				.orElseThrow(() -> new IllegalArgumentException("Product is not available with ID: " + cartItemRequestDto.getId()));
		Cart_Item cartItem = cartItemRepository.findByCartId_IdAndProduct_Id(cart.getId(), product.getId()).orElse(null);
		if (product.getStock() < cartItemRequestDto.getQuantity()) {
			throw new IllegalArgumentException("Insufficient stock for product: " + product.getName());
		}

		cartItem.setQuantity(cartItemRequestDto.getQuantity());
		Cart_Item savedItem = cartItemRepository.save(cartItem);

		CartItemResponseDto dto = new CartItemResponseDto();
		dto.setCartItemId(savedItem.getId());
		dto.setProductId(product.getId());
		dto.setProductName(product.getName());
		dto.setPrice(product.getPrice());
		dto.setQuantity(savedItem.getQuantity());          
		dto.setSubtotal(product.getPrice() * savedItem.getQuantity());

		return dto;
	}
	@Override
	public void removeFromCart(Long userId, Long product) {
	    Cart cart = cartsRepository.findByUserId(userId)
	            .orElseThrow(() -> new IllegalArgumentException("Cart does not exist for user: " + userId));
                                                                                                           
	    Cart_Item cartItem = cartItemRepository.findByCartId_IdAndProduct_Id(cart.getId(), product)
	            .orElseThrow(() -> new IllegalArgumentException("Product not found in cart: " + product));

	    cartItemRepository.delete(cartItem);
	}
}
