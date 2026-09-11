package com.memorycrafts.memorycrafts_backend.controller;

import com.memorycrafts.memorycrafts_backend.entity.Wishlist;
import com.memorycrafts.memorycrafts_backend.service.WishlistService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlists")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping
    public Wishlist saveWishlist(@Valid @RequestBody Wishlist wishlist) {
        return wishlistService.saveWishlist(wishlist);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Wishlist> getWishlist(@PathVariable String userId) {

        return wishlistService.getWishlistByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}