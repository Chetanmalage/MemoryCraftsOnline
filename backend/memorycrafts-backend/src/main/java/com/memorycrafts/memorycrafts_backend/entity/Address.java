package com.memorycrafts.memorycrafts_backend.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "addresses")
@Data
public class Address {

    @Id
    private String id;

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Phone is required")
    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Enter a valid 10-digit phone number"
    )
    private String phone;

    @NotBlank(message = "Address is required")
    private String addressLine;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    @Pattern(
        regexp = "^\\d{6}$",
        message = "Enter a valid 6-digit pincode"
    )
    private String pincode;

    private boolean isDefault;
}