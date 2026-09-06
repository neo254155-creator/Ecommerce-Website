package com.SpringStore.Ecommerce.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SpringStore.Ecommerce.dto.CategoryRequestDto;
import com.SpringStore.Ecommerce.dto.CategoryResponseDto;
import com.SpringStore.Ecommerce.dto.ProductRequestDto;
import com.SpringStore.Ecommerce.dto.ProductResponseDto;
import com.SpringStore.Ecommerce.service.CategoryService;
import com.SpringStore.Ecommerce.service.ProductService;
import com.SpringStore.Ecommerce.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping({"/api/categories", "/api/category"})
public class CategoryController {
public CategoryService categoryService;
public CategoryController(CategoryService categoryService) {
	this.categoryService=categoryService;
}
@PostMapping
public ResponseEntity<CategoryResponseDto> createCategory(@Valid @RequestBody CategoryRequestDto categoryRequestDto){
	return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(categoryRequestDto));
}
@GetMapping("/{id}")
public ResponseEntity<CategoryResponseDto> getCategoryById(@PathVariable Long id ){
	return ResponseEntity.ok(categoryService.getCategoryById(id));
}
@GetMapping 
public ResponseEntity<List<CategoryResponseDto>> getAllCategory(){
	return ResponseEntity.ok(categoryService.getAllCategory());
}
}



  



























