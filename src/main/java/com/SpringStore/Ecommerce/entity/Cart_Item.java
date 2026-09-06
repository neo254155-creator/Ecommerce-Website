package com.SpringStore.Ecommerce.entity;


import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "cart_item")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart_Item{
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cartId;
    
    @ManyToOne 
    @JoinColumn(name = "product_id")             
    private Products product;
    
    private int quantity;
    
	public Long getId() {
		return id;
	}


	
	public void setId(Long id) {
		this.id = id;
	}


	public Cart getCart() {
		return cartId;
	}


	public void setCart(Cart cartId) {
		this.cartId = cartId;
	}

	
	public Products getProduct() {
		return product;
	}
	


	public void setProduct(Products product) {
		this.product = product;
	}

	
	public int getQuantity() {
		return quantity;
	}

	
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
    
}


