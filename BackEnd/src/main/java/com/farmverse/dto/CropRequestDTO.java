package com.farmverse.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropRequestDTO {

    @NotBlank(message = "Crop name is required")
    private String cropName;
<<<<<<< HEAD

=======
    
    @NotBlank(message = "Season is required")
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
    private String season;

    private String stage;

    private String health;

<<<<<<< HEAD
=======
    private java.time.LocalDate plantingDate;

>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
    private String expectedYield;

    @NotNull(message = "Farm ID is required")
    private Long farmId;
}