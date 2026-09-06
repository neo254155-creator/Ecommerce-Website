package com.SpringStore.Ecommerce.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.SpringStore.Ecommerce.Repository.CartsRepository;
import com.SpringStore.Ecommerce.Repository.Carts_ItemRepository;
import com.SpringStore.Ecommerce.Repository.OrdersRepository;
import com.SpringStore.Ecommerce.Repository.ProductsRepository;
import com.SpringStore.Ecommerce.Repository.UserRepository;
import com.SpringStore.Ecommerce.dto.OrderRequestDto;
import com.SpringStore.Ecommerce.dto.OrderResponseDto;
import com.SpringStore.Ecommerce.entity.Cart;
import com.SpringStore.Ecommerce.entity.Cart_Item;
import com.SpringStore.Ecommerce.entity.Order_Item;
import com.SpringStore.Ecommerce.entity.Orders;
import com.SpringStore.Ecommerce.entity.Products;
import com.SpringStore.Ecommerce.entity.User;
import com.SpringStore.Ecommerce.entity.Type.Status;

import jakarta.transaction.Transactional;

@Service
public class OrderServiceImpl implements OrderService {
    private final CartsRepository cartsRepository;
    private final Carts_ItemRepository cartItemRepository;
    private final OrdersRepository ordersRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public OrderServiceImpl(OrdersRepository ordersRepository, CartsRepository cartsRepository,
            ModelMapper modelMapper, Carts_ItemRepository cartItemRepository, UserRepository userRepository) {
        this.cartsRepository = cartsRepository;
        this.modelMapper = modelMapper;
        this.cartItemRepository = cartItemRepository;
        this.ordersRepository = ordersRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public OrderResponseDto placeOrder(Long userId) {
        return placeOrder(userId, null);
    }

    @Override
    @Transactional
    public OrderResponseDto placeOrder(Long userId, OrderRequestDto orderRequestDto) {
    	 Cart cart = cartsRepository.findByUserId(userId)
    	            .orElseThrow(() -> new RuntimeException("Cart not found"));

    	    List<Cart_Item> items = cartItemRepository.findByCartId(cart.getId());

    	    if (items.isEmpty())
    	        throw new RuntimeException("Cart is empty");

    	    Orders order = new Orders();
    	    order.setUser(cart.getUserId());
    	    order.setOrderDate(LocalDateTime.now());
    	    order.setStatus(Status.Order_Confirmed);
    	    order.setEmail(orderRequestDto.getEmail());
    	    order.setAddress(orderRequestDto.getAddress());
    	    order.setPhno(orderRequestDto.getPhno());

        double totalAmount = 0;
        List<Order_Item> orderItems = new ArrayList<>();

        for (Cart_Item item : items) {
            Products product = item.getProduct();

            if (product.getStock() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            product.setStock(product.getStock() - item.getQuantity());

            Order_Item orderItem = new Order_Item();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());
            totalAmount += product.getPrice() * item.getQuantity();

            orderItems.add(orderItem);
        }

        order.setAmount(totalAmount);
        order.setOrderItems(orderItems);

        Orders saved = ordersRepository.save(order);

        cartItemRepository.deleteAll(items);
        OrderResponseDto responseDto = new OrderResponseDto();
        responseDto.setOrderId(saved.getId());
        responseDto.setStatus(saved.getStatus().toString());
        responseDto.setTotalAmount(saved.getAmount());

        return responseDto;
}
 
}


