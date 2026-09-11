package com.memorycrafts.memorycrafts_backend.entity;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "orders")
@Data
public class Order {

    @Id
    private String id;

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotEmpty(message = "Order must contain at least one item")
    @Valid
    private List<CartItem> items;

    @PositiveOrZero(message = "Subtotal cannot be negative")
    private double subtotal;

    @PositiveOrZero(message = "Delivery cannot be negative")
    private double delivery;

    @PositiveOrZero(message = "Total cannot be negative")
    private double total;

    @NotBlank(message = "Order status is required")
    private String status;

    @NotBlank(message = "Order date is required")
    private String date;
}