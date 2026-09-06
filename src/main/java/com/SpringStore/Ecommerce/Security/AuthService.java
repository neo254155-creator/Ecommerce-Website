package com.SpringStore.Ecommerce.Security;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.SpringStore.Ecommerce.Repository.CartsRepository;

import com.SpringStore.Ecommerce.Repository.UserRepository;
import com.SpringStore.Ecommerce.dto.LoginRequestDto;
import com.SpringStore.Ecommerce.dto.LoginResponseDto;
import com.SpringStore.Ecommerce.dto.SignUpRequestDto;
import com.SpringStore.Ecommerce.dto.SignUpResponseDto;
import com.SpringStore.Ecommerce.entity.Cart;
import com.SpringStore.Ecommerce.entity.Type.Role;
import com.SpringStore.Ecommerce.entity.User;


@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
   
    private final UserRepository userRepository;
    private final CartsRepository cartsRepository;
    private final AuthUtil authUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager,
                        AuthUtil authUtil,
                        UserRepository userRepository,
                        
                        CartsRepository cartsRepository,
                        PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.authUtil = authUtil;
        this.userRepository = userRepository;
     
        this.cartsRepository = cartsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponseDto login(LoginRequestDto request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        User user = (User) authentication.getPrincipal();
        String token = authUtil.generateAccessToken(user);
        String role = user.getRole() != null ? user.getRole().name() : "CUSTOMER";

        return new LoginResponseDto(token, user.getId(), user.getUsername(), role,user.getEmail(),user.getPhno());
    }



public SignUpResponseDto signup(SignUpRequestDto request) {
    if (userRepository.existsByUsername(request.getUsername())) {
        throw new IllegalArgumentException("That username is already taken");
    }

    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setRole(Role.CUSTOMER);
    user.setName(request.getUsername());

user.setEmail(request.getEmail());
user.setPhno(request.getPhno());

    User saved = userRepository.save(user);

    Cart cart = new Cart();
    cart.setUserId(saved);
    cartsRepository.save(cart);

    return new SignUpResponseDto(saved.getId(), saved.getUsername(), saved.getRole().name(),saved.getEmail(),saved.getPhno());
}
}
