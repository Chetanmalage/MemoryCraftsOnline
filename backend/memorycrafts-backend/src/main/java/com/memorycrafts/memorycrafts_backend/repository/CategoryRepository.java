package com.memorycrafts.memorycrafts_backend.repository;

import com.memorycrafts.memorycrafts_backend.entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
}