package com.memorycrafts.memorycrafts_backend.controller;

import com.memorycrafts.memorycrafts_backend.dto.UserResponse;
import com.memorycrafts.memorycrafts_backend.entity.User;
import com.memorycrafts.memorycrafts_backend.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {

        try {

            User savedUser = userService.saveUser(user);

            UserResponse response = new UserResponse();

            response.setId(savedUser.getId());
            response.setName(savedUser.getName());
            response.setEmail(savedUser.getEmail());
            response.setPhone(savedUser.getPhone());

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(409)
                    .body("Email already registered");
        }
    }
}