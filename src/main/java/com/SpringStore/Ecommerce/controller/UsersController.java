
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.SpringStore.Ecommerce.dto.ProductRequestDto;
import com.SpringStore.Ecommerce.dto.ProductResponseDto;
import com.SpringStore.Ecommerce.dto.UserRequestDto;
import com.SpringStore.Ecommerce.dto.UserResponseDto;
import com.SpringStore.Ecommerce.service.ProductService;
import com.SpringStore.Ecommerce.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UsersController {
private final 	UserService userService;
public UsersController(UserService userService) {
	this.userService = userService;
}
@PostMapping
public ResponseEntity <UserResponseDto> createUser( @Valid @RequestBody UserRequestDto userRequestDto){
	return ResponseEntity.status(HttpStatus.CREATED)
            .body(userService.createUser(userRequestDto));
}
@GetMapping("/{id}")
public ResponseEntity <UserResponseDto> getUserById(@PathVariable Long id){
	return ResponseEntity.ok(userService.getUserById(id));
}
}
