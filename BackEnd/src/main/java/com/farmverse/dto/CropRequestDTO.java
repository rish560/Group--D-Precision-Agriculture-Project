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
    
    @NotBlank(message = "Season is required")
    private String season;

    private String stage;

    private String health;

    private java.time.LocalDate plantingDate;

    private String expectedYield;

    @NotNull(message = "Farm ID is required")
    private Long farmId;
}