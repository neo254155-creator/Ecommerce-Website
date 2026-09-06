 package com.SpringStore.Ecommerce.dto;
import com.SpringStore.Ecommerce.entity.Products;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItemResponseDto {



    private Long cartItemId;
    private Long productId;
    private String productName;
    private Double productPrice;
    private Integer quantity;
    private Double subtotal;

	public Long getCartItemId() {
		return cartItemId;
	}
	/**
	 * @param cartItemId the cartItemId to set
	 */
	public void setCartItemId(Long cartItemId) {
		this.cartItemId = cartItemId;
	}
	/**
	 * @return the productId
	 */
	public Long getProductId() {
		return productId;
	}
	/**
	 * @param productId the productId to set
	 */
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	/**
	 * @return the productName
	 */
	public String getProductName() {
		return productName;
	}
	/**
	 * @param productName the productName to set
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}
	/**
	 * @return the price
	 */
	public Double getProductPrice() {
		return productPrice;
	}
	/**
	 * @param price the price to set
	 */
	public void setPrice(Double price) {
		this.productPrice = price;
	}
	/**
	 * @return the quantity
	 */
	public Integer getQuantity() {
		return quantity;
	}
	/**
	 * @param quantity the quantity to set
	 */
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	public Double getSubtotal() {
		return subtotal;
	}
	
	public void setSubtotal(Double subtotal) {
		this.subtotal = subtotal;
	}
    
}


