package com.fitness.userservice.controller;


import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.model.UserC;
import com.fitness.userservice.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserDetails(@PathVariable String userId) {
        try{
            UserResponse userResponse = userService.getUserDetails(userId);
            return ResponseEntity.ok(userResponse);
        }catch(Exception e){
            UserResponse userResponse = userService.getUserDetails(userId);
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> regestorUser( @Valid @RequestBody RegisterRequest user) {
        return ResponseEntity.ok(userService.registorUser(user));
    }
    @GetMapping("/all")
    public ResponseEntity<Iterable<UserC>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{userId}/validate")
    public ResponseEntity<Boolean> isUserExist(@PathVariable String userId){
        System.out.println("user for validate user id"+userService.isUserExist(userId));
        return ResponseEntity.ok(userService.isUserExist(userId));
    }
}
