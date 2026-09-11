package com.memorycrafts.memorycrafts_backend.repository;

import com.memorycrafts.memorycrafts_backend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}