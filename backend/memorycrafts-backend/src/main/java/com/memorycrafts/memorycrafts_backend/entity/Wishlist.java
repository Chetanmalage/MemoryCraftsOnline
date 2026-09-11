package com.memorycrafts.memorycrafts_backend.entity;

import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "wishlists")
@Data
public class Wishlist {

    @Id
    private String id;

    private String userId;

    @Valid
    private List<WishlistItem> items;
}