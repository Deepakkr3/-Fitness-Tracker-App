package com.fitness.userservice.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
   @NotBlank(message = "email is required!")
   @Email(message = "invalid email address")
    private String email;
    @NotBlank(message = "password is required!")
    @Size(min = 3 ,message = "password at least 3 characters")
    private String password;
    @NotBlank(message = "firstname is required!")
    private String firstName;
    private String lastName;
}
