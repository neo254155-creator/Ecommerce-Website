package com.SpringStore.Ecommerce.service;

import java.util.List;
import java.util.Map;

import com.SpringStore.Ecommerce.dto.ProductRequestDto;
import com.SpringStore.Ecommerce.dto.ProductResponseDto;

public interface ProductService {
    List<ProductResponseDto> getAllProducts();

    ProductResponseDto getProductById(Long id);

     ProductResponseDto AddProducts(ProductRequestDto productRequestDto);

	 void deleteProductById(Long id);

	 ProductResponseDto partialUpdate(Long id, Map<String, Object> update);

	List<ProductResponseDto> getProductsByCategory(Long categoryId);
	
	ProductResponseDto searchProductsByName(String name);

	
}
