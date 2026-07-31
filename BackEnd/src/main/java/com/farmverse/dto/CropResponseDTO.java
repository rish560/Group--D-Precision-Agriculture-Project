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
    private java.time.LocalDate plantingDate;
    private String expectedYield;
    private Long farmId;
    private String farmName;
}