package com.memorycrafts.memorycrafts_backend.repository;

import com.memorycrafts.memorycrafts_backend.entity.Wishlist;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface WishlistRepository extends MongoRepository<Wishlist, String> {

    Optional<Wishlist> findByUserId(String userId);
}