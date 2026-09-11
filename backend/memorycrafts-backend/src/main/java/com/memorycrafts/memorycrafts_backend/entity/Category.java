package com.memorycrafts.memorycrafts_backend.entity;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "categories")
@Data
public class Category {

    @Id
    private String id;

    @NotBlank(message = "Category name is required")
    private String name;
}