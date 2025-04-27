package com.gateway.gateway_servise.keycloac;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserC {

  private String id;
  private String keycklockId;

  private String email;

    private String password;
    private String firstName;
    private String lastName;



    private UserRole role=UserRole.USER_ROLE;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
