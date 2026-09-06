package com.SpringStore.Ecommerce.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.SpringStore.Ecommerce.entity.Cart;
import com.SpringStore.Ecommerce.entity.User;

public interface CartsRepository extends JpaRepository< Cart, Long> {
	 @Query("select c from Cart c where c.userId.id = :userId")
	Optional<Cart> findByUserId(Long userId);
	
}

