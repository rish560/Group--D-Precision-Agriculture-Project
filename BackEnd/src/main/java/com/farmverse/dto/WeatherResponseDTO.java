package com.farmverse.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeatherResponseDTO {

    private String location;

    // Current conditions
    private double currentTemp;
    private String currentCondition;   // e.g. "Clear", "Rain", "Thunderstorm"
    private String currentIcon;        // emoji, e.g. "☀️"
    private int currentHumidity;

    // Tomorrow's outlook
    private double tomorrowHigh;
    private double tomorrowLow;
    private int tomorrowRainChance;    // 0-100 %
    private String tomorrowCondition;
    private String tomorrowIcon;
}
