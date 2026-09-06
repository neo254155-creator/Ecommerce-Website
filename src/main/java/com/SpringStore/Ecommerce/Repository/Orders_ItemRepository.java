package com.SpringStore.Ecommerce.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SpringStore.Ecommerce.entity.Order_Item;

public interface Orders_ItemRepository extends JpaRepository<Order_Item, Long> {
	List<Order_Item> findByOrderId(Long orderId);
	
}
