package com.SpringStore.Ecommerce.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SpringStore.Ecommerce.entity.Cart;
import com.SpringStore.Ecommerce.entity.Orders;
import com.SpringStore.Ecommerce.entity.User;

	public interface UserRepository extends JpaRepository<User, Long> {
	    Optional<User> findByUsername(String username);
	    boolean existsByUsername(String username);
	}
