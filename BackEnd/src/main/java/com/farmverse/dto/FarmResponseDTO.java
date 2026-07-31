package com.farmverse.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmResponseDTO {

    private Long farmId;
    private String farmName;
<<<<<<< HEAD
    private String farmerName;
    private String location;
    private BigDecimal area;
    private String areaUnit;
    private String waterSource;
    private String status;
    private Long ownerId;
    private String ownerUsername;
=======
    private String location;
    private BigDecimal area;
    private Long ownerId;
private String ownerUsername;
private String currentCrop;
private String waterSource;
private String status;
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
}