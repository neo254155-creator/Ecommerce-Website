package com.SpringStore.Ecommerce.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@Table(name = "Cateogry")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Category {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 @Column(name="Catogry_name")
	 private String name;
	 @OneToMany(mappedBy="category" ,cascade = CascadeType.ALL,orphanRemoval = true)
	 private List<Products> product;

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

    public List<Products> getProduct() {
        return product;
    }

    public void setProduct(List<Products> product) {
        this.product = product;
    }
}
