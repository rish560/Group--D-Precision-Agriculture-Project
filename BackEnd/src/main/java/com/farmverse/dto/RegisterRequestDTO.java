package com.farmverse.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequestDTO {

<<<<<<< HEAD
    @Size(max = 150, message = "Full name must be at most 150 characters")
    private String fullName;

=======
    @NotBlank(message = "Username is required")
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
    @Size(max = 100, message = "Username must be at most 100 characters")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 150, message = "Email must be at most 150 characters")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

<<<<<<< HEAD
    private String confirmPassword;

    private String phoneNumber;

=======
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
    @NotBlank(message = "Role is required")
    @Size(max = 50, message = "Role must be at most 50 characters")
    private String role;
}