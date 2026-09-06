package com.SpringStore.Ecommerce.service;


import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.SpringStore.Ecommerce.Repository.UserRepository;
import com.SpringStore.Ecommerce.dto.UserRequestDto;
import com.SpringStore.Ecommerce.dto.UserResponseDto;
import com.SpringStore.Ecommerce.entity.User;


@Service
public class UserServiceImpl implements UserService{
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
public UserServiceImpl(UserRepository userRepository,ModelMapper modelMapper) {
	this.userRepository=userRepository;
	this.modelMapper=modelMapper;
}
@Override
public UserResponseDto createUser(UserRequestDto userRequestDto) {
    User user = modelMapper.map(userRequestDto, User.class);
   
    User savedUser = userRepository.save(user);
    return modelMapper.map(savedUser, UserResponseDto.class);   
}
@Override
public UserResponseDto getUserById(Long id) {
	User user=userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User  not found with ID: " + id));
	return modelMapper.map(user,UserResponseDto.class);
}

}
