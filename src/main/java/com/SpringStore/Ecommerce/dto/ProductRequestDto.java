package com.SpringStore.Ecommerce.dto;

import com.SpringStore.Ecommerce.entity.Category;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

  
@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductRequestDto {

    @NotBlank(message = "Product name cannot be blank")
    @JsonProperty("name")
    private String name;
    
    @NotBlank(message = "Product description cannot be blank")
    @JsonProperty("description")
    private String description;
    
    @NotNull(message = "Price cannot be null")
    @Positive(message = "Price must be positive")
    @JsonProperty("price")
    private Double price;
    
    @NotNull(message = "Stock cannot be null")
    @jakarta.validation.constraints.PositiveOrZero(message = "Stock cannot be negative")
    @JsonProperty("stock")
    private Integer stock;
    
    @NotNull(message = "Category ID cannot be null")
    @JsonProperty("categoryId")
    private Long categoryId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}