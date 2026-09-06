package com.SpringStore.Ecommerce.entity;


import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Products {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name="product_name")
    private String name;
    
    @Column(name="price")
    private double price; 
    
    private int stock;

    @Column(name = "description")
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy="product" )
    private List<Cart_Item> cartProductId;

    @OneToMany(mappedBy="product")
    private List<Order_Item> order_items;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Cart_Item> getCartProductId() {
        return cartProductId;
    }

    public void setCartProductId(List<Cart_Item> cartProductId) {
        this.cartProductId = cartProductId;
    }

    public List<Order_Item> getOrder_items() {
        return order_items;
    }

    public void setOrder_items(List<Order_Item> order_items) {
        this.order_items = order_items;
    }
}
    
