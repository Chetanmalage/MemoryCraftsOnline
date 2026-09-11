package com.memorycrafts.memorycrafts_backend.service;

import com.memorycrafts.memorycrafts_backend.entity.Address;
import com.memorycrafts.memorycrafts_backend.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address saveAddress(Address address) {
        return addressRepository.save(address);
    }

    public List<Address> getAddressesByUserId(String userId) {
        return addressRepository.findByUserId(userId);
    }
}