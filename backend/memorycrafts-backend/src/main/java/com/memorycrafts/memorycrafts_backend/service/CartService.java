package com.memorycrafts.memorycrafts_backend.service;

import com.memorycrafts.memorycrafts_backend.entity.Cart;
import com.memorycrafts.memorycrafts_backend.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Optional<Cart> getCartByUserId(String userId) {
        return cartRepository.findByUserId(userId);
    }
}