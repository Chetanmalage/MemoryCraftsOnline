package com.memorycrafts.memorycrafts_backend.service;

import com.memorycrafts.memorycrafts_backend.entity.Wishlist;
import com.memorycrafts.memorycrafts_backend.repository.WishlistRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    public WishlistService(WishlistRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }

    public Wishlist saveWishlist(Wishlist wishlist) {
        return wishlistRepository.save(wishlist);
    }

    public Optional<Wishlist> getWishlistByUserId(String userId) {
        return wishlistRepository.findByUserId(userId);
    }
}