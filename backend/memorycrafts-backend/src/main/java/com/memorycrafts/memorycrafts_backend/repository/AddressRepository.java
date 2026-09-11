package com.memorycrafts.memorycrafts_backend.repository;

import com.memorycrafts.memorycrafts_backend.entity.Address;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AddressRepository extends MongoRepository<Address, String> {

    List<Address> findByUserId(String userId);
}