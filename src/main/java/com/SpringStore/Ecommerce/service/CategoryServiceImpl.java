package com.SpringStore.Ecommerce.service;

import java.util.List;
import com.SpringStore.Ecommerce.entity.Category;  
import java.util.stream.Collectors;

import com.SpringStore.Ecommerce.Repository.CategoryRepository;
import com.SpringStore.Ecommerce.Repository.ProductsRepository;
import com.SpringStore.Ecommerce.dto.CategoryRequestDto;
import com.SpringStore.Ecommerce.dto.CategoryResponseDto;
import com.SpringStore.Ecommerce.dto.ProductResponseDto;
import com.SpringStore.Ecommerce.entity.Products;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
@Service
public class CategoryServiceImpl implements CategoryService{
private final CategoryRepository categoryRepository;
private final ModelMapper modelMapper;
public CategoryServiceImpl(CategoryRepository categoryRepository,ModelMapper modelMapper) {
	this.categoryRepository=categoryRepository;
	this.modelMapper=modelMapper;
}
@Override
public CategoryResponseDto createCategory(CategoryRequestDto categoryRequestDto) {
	Category category=modelMapper.map(categoryRequestDto,Category.class);
	Category NewCategory=categoryRepository.save(category);
	return modelMapper.map(NewCategory,CategoryResponseDto.class);
	
}
@Override
public CategoryResponseDto getCategoryById(Long id) {
	Category category=categoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Category not found with ID: " + id));
	return modelMapper.map(category, CategoryResponseDto.class);
}
@Override
public List<CategoryResponseDto> getAllCategory() {
List<Category> category=categoryRepository.findAll();
return category.stream()
        .map(p -> modelMapper.map(p,CategoryResponseDto.class))
        .collect(Collectors.toList());
}

} 