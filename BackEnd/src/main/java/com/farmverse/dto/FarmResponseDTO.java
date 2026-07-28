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
    private String location;
    private BigDecimal area;
    private Long ownerId;
    private String ownerUsername;
}