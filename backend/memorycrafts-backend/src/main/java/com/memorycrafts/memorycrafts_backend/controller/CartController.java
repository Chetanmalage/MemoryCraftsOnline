package com.memorycrafts.memorycrafts_backend.controller;

import com.memorycrafts.memorycrafts_backend.entity.Cart;
import com.memorycrafts.memorycrafts_backend.service.CartService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public Cart saveCart(@Valid @RequestBody Cart cart) {
        return cartService.saveCart(cart);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable String userId) {

        return cartService.getCartByUserId(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}