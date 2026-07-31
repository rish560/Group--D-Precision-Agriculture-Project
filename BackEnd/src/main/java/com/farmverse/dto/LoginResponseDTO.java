package com.farmverse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDTO {

<<<<<<< HEAD
    private String token;
    private String role;
    private Long id;
    private String fullName;
    private String username;
    private String email;
    private String phoneNumber;
=======
    private Long id;        // new
    private String email;   // new
    private String token;
    private String role;
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
}