package com.farmverse.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterResponseDTO {

    private String message;
    private Long id;
<<<<<<< HEAD
    private String fullName;
    private String username;
    private String email;
    private String phoneNumber;
=======
    private String username;
    private String email;
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
    private String role;
    private LocalDateTime createdAt;
}