package com.memorycrafts.memorycrafts_backend.controller;

import com.memorycrafts.memorycrafts_backend.dto.UserResponse;
import com.memorycrafts.memorycrafts_backend.entity.User;
import com.memorycrafts.memorycrafts_backend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            UserService userService,
            PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestParam String email,
            @RequestParam String password) {

        User user = userService.findByEmail(email)
                .orElse(null);

        if (user == null ||
                !passwordEncoder.matches(password, user.getPassword())) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        UserResponse response = new UserResponse();

        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());

        return ResponseEntity.ok(response);
    }
}