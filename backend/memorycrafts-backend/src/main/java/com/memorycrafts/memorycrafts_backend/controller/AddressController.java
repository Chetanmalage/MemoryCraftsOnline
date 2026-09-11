package com.memorycrafts.memorycrafts_backend.controller;

import jakarta.validation.Valid;
import com.memorycrafts.memorycrafts_backend.entity.Address;
import com.memorycrafts.memorycrafts_backend.service.AddressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping
    public Address saveAddress(@Valid @RequestBody Address address) {
        return addressService.saveAddress(address);
    }

    @GetMapping("/{userId}")
    public List<Address> getAddresses(@PathVariable String userId) {
        return addressService.getAddressesByUserId(userId);
    }
}