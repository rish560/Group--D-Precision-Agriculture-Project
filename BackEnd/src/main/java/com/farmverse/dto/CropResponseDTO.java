package com.farmverse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropResponseDTO {

    private Long cropId;
    private String cropName;
    private String season;
    private String stage;
    private String health;
<<<<<<< HEAD
    private String expectedYield;
    private Long farmId;
    private String farmName;
    private String farmerName;
=======
    private java.time.LocalDate plantingDate;
    private String expectedYield;
    private Long farmId;
    private String farmName;
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
}