package com.SpringStore.Ecommerce.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.SpringStore.Ecommerce.entity.Cart;
import com.SpringStore.Ecommerce.entity.Cart_Item;
import com.SpringStore.Ecommerce.entity.Orders;
import com.SpringStore.Ecommerce.entity.Type.Status;

public interface Carts_ItemRepository extends JpaRepository<Cart_Item , Long> {
	 @Query("select c from Cart_Item c where c.cartId.id = :cartId")
	List<Cart_Item> findByCartId(Long cartId);
	Optional<Cart_Item> findByCartId_IdAndProduct_Id(Long cartId, Long productId);
	void deleteByCartId_IdAndProduct_Id(Long cartId, Long productId);

	
		
	}
 