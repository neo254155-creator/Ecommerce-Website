package com.SpringStore.Ecommerce.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Id;

@Entity
@Table(name = "Cart")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "Users_id", nullable = false)
	private User userId;
	 @OneToMany(mappedBy="cartId" ,cascade = CascadeType.ALL,orphanRemoval = true)
	 private List<Cart_Item> cartItem;
	 /**
 	 * @return the id
 	 */
	 public Long getId() {
		 return id;
	 }
	 /**
 	 * @param id the id to set 
 	 */
	 public void setId(Long id) {
		 this.id = id;
	 }
	 /**
 	 * @return the userId
 	 */
	 public User getUserId() {
		 return userId;
	 }
	 /**
 	 * @param userId the userId to set
 	 */
	 public void setUserId(User userId) {
		 this.userId = userId;
	 }
	 /**
 	 * @return the cartItem
 	 */
	 public List<Cart_Item> getCartItem() {
		 return cartItem;
	 }
	
	 public void setCartItem(List<Cart_Item> cartItem) {
		 this.cartItem = cartItem;
	 }
	 
} 