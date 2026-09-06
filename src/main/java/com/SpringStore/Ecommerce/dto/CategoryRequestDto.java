package com.SpringStore.Ecommerce.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestDto {
	@JsonProperty("id")
public Long id;
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
public String name;
public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}

}
