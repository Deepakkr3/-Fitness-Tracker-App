package com.fitness.userservice.repo;

import com.fitness.userservice.model.UserC;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserC,String> {
    boolean existsByEmail( String email);
}
