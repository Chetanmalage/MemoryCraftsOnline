package com.memorycrafts.memorycrafts_backend.entity;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CartItem {

    @NotBlank(message = "Product ID is required")
    private String productId;

    @NotBlank(message = "Product name is required")
    private String name;

    @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than 0")
    private double price;

    @NotBlank(message = "Image is required")
    private String image;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
}