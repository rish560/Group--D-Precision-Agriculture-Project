package com.farmverse.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmRequestDTO {

    @NotBlank(message = "Farm name is required")
    private String farmName;

<<<<<<< HEAD
    private String farmerName;

=======
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Area is required")
    @Positive(message = "Area must be positive")
    private BigDecimal area;

<<<<<<< HEAD
    private String areaUnit;

    private String waterSource;

    private String status;

    @NotNull(message = "Owner ID is required")
    private Long ownerId;
=======
    @NotNull(message = "Owner ID is required")
private Long ownerId;

private String currentCrop;

private String waterSource;

private String status;

    
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
}