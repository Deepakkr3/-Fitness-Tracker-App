package com.fitness.userservice.service;


import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.model.UserC;
import com.fitness.userservice.repo.UserRepo;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;
    public UserResponse getUserDetails(String userId) {


        UserC user =userRepo.findById(userId).orElseThrow(()->new RuntimeException(("user not found")));
        UserResponse response = new UserResponse(user);
        return response;
    }

    public UserResponse registorUser(@Valid RegisterRequest user) {

        if(userRepo.existsByEmail(user.getEmail())){
            throw new RuntimeException("Email already exists");
        }

        UserC  newUser = new UserC();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(user.getPassword());
      UserC savedUser=  userRepo.save(newUser);
      UserResponse newResponse = new UserResponse(savedUser);
      return newResponse;

    }

    public Iterable<UserC> getAllUsers() {
        return userRepo.findAll();
    }
}
