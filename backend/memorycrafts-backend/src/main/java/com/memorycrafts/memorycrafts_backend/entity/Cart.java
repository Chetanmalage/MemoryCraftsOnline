package com.memorycrafts.memorycrafts_backend.entity;

import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "carts")
@Data
public class Cart {

    @Id
    private String id;

    private String userId;

    @Valid
    private List<CartItem> items;
}