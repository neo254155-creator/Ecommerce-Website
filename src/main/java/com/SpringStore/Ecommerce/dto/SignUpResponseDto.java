package com.SpringStore.Ecommerce.dto;

public class SignUpResponseDto {
    private Long id;
    private String username;
    private String role;
    private String email;
    private Long phno;

    public SignUpResponseDto() {
    }

    public SignUpResponseDto(Long id, String username, String role, String email, Long phno) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.email = email;
        this.phno = phno;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
