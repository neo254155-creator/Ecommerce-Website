package com.SpringStore.Ecommerce.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SpringStore.Ecommerce.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Long> {
	List<Products> findByCategoryId(Long categoryId);
	Products findByName(String name);
	
	}
 