package com.SpringStore.Ecommerce.service;

import com.SpringStore.Ecommerce.dto.UserRequestDto;
import com.SpringStore.Ecommerce.dto.UserResponseDto;

public interface UserService {
UserResponseDto createUser(UserRequestDto userRequestDto);

UserResponseDto getUserById(Long id);
}
