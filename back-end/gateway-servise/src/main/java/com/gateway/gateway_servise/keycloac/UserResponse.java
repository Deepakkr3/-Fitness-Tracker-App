package com.gateway.gateway_servise.keycloac;



import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {

    private String id;
    private String email;
    private String keycklockId;

    private String password;
    private String firstName;
    private String lastName;


    private UserRole role=UserRole.USER_ROLE;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public UserResponse(UserC savedUser) {
        this.id = savedUser.getId();
        this.email = savedUser.getEmail();
        this.password = savedUser.getPassword();
        this.firstName = savedUser.getFirstName();
        this.lastName = savedUser.getLastName();
        this.role = savedUser.getRole();
        this.createdAt = savedUser.getCreatedAt();
        this.updatedAt = savedUser.getUpdatedAt();
        this.keycklockId=savedUser.getKeycklockId();
    }
}
