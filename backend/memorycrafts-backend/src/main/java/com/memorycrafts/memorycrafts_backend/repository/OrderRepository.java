package com.memorycrafts.memorycrafts_backend.repository;

import com.memorycrafts.memorycrafts_backend.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByUserId(String userId);
}