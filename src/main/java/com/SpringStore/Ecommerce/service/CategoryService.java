package com.SpringStore.Ecommerce.service;

import java.util.List;

import com.SpringStore.Ecommerce.dto.CategoryRequestDto;
import com.SpringStore.Ecommerce.dto.CategoryResponseDto;
import com.SpringStore.Ecommerce.dto.ProductResponseDto;

public interface CategoryService {
CategoryResponseDto createCategory(CategoryRequestDto categoryRequestDto);

CategoryResponseDto getCategoryById(Long id);

List<CategoryResponseDto> getAllCategory();
	 
}
