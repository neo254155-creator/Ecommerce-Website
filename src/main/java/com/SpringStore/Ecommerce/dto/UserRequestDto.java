 package com.SpringStore.Ecommerce.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
 @NoArgsConstructor
 @AllArgsConstructor
public class UserRequestDto {
	@NotNull(message="Required field")
public String name;
	@NotNull(message="Email is required")
public String email;
	@NotNull(message="Address is required")
public String address;
	@NotNull(message="Address is required")
	public Long Phno ;
	public Long getPhno() {
		return Phno;
	}
	
	public void setPhno(Long phno) {
		Phno = phno;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}
	
	public void setAddress(String address) {
		this.address = address;
	}
}