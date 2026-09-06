package com.SpringStore.Ecommerce.entity;


import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

import com.SpringStore.Ecommerce.entity.Type.Status;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Orders {
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
	 @ManyToOne
	 @JoinColumn(name="Users_id" ,nullable=false)
private User user;
	 @Column(name="Orders_Date")
private LocalDateTime orderDate;
	 @Column(name="email")
private String email;
	 @Column(name="address")
private String address;
	 @Column(name="phno")
private Long phno;
@Enumerated(EnumType.STRING)
private Status status;
private double amount; 
@OneToMany(mappedBy="order" ,cascade = CascadeType.ALL,orphanRemoval = true)
private List<Order_Item> orderItems;
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
 * @return the user
 */
public User getUser() {
	return user;
}
/**
 * @param user the user to set
 */
public void setUser(User user) {
	this.user = user;
}
/**
 * @return the orderDate
 */
public LocalDateTime getOrderDate() {
	return orderDate;
}
/**
 * @param orderDate the orderDate to set
 */
public void setOrderDate(LocalDateTime orderDate) {
	this.orderDate = orderDate;
}
/**
 * @return the email
 */
public String getEmail() {
	return email;
}
/**
 * @param email the email to set
 */
public void setEmail(String email) {
	this.email = email;
}
/**
 * @return the address
 */
public String getAddress() {
	return address;
}
/**
 * @param address the address to set
 */
public void setAddress(String address) {
	this.address = address;
}
/**
 * @return the phno
 */
public Long getPhno() {
	return phno;
}
/**
 * @param phno the phno to set
 */
public void setPhno(Long phno) {
	this.phno = phno;
}
/**
 * @return the status
 */
public Status getStatus() {
	return status;
}
/**
 * @param status the status to set
 */
public void setStatus(Status status) {
	this.status = status;
}
/**
 * @return the amount
 */
public double getAmount() {
	return amount;
}
/**
 * @param amount the amount to set
 */
public void setAmount(double amount) {
	this.amount = amount;
}
/**
 * @return the orderItems
 */
public List<Order_Item> getOrderItems() {
	return orderItems;
}
/**
 * @param orderItems the orderItems to set
 */
public void setOrderItems(List<Order_Item> orderItems) {
	this.orderItems = orderItems;
}

}
