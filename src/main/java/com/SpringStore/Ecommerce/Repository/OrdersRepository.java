package com.SpringStore.Ecommerce.Repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SpringStore.Ecommerce.entity.Orders;
import com.SpringStore.Ecommerce.entity.Type.Status;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
	List<Orders> findByUserId(Long userId);

	List<Orders> findByStatusAndOrderDateBefore(Status orderConfirmed,
			LocalDateTime oneDayAgo);
	
}
