package com.SpringStore.Ecommerce.dto;

public class LoginResponseDto {
    private String token;
    private Long userId;
    private String username;
    private String role;
    private String email;
    private Long phno;

    public LoginResponseDto() {
    }

    public LoginResponseDto(String token, Long userId, String username, String role, String email, Long phno) {
        this.token = token;
        this.userId = userId;
        this.username = username;
        this.role = role;
        this.email = email;
        this.phno = phno;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getPhno() {
        return phno;
    }

    public void setPhno(Long phno) {
        this.phno = phno;
    }
}
