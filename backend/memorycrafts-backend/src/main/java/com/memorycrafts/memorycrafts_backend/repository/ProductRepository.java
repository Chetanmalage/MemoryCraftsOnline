package com.memorycrafts.memorycrafts_backend.repository;

import com.memorycrafts.memorycrafts_backend.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}