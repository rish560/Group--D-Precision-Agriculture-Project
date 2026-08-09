package com.farmverse.service;

import com.farmverse.dto.WeatherResponseDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class WeatherServiceImpl implements WeatherService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    @Value("${weatherapi.api.key}")
    private String apiKey;

    @Value("${weatherapi.forecast.url}")
    private String forecastUrl;

    @Override
    public WeatherResponseDTO getWeather(String location) {
        if (location == null || location.isBlank()) {
            throw new IllegalArgumentException("Location is required");
        }

        try {
            // WeatherAPI.com returns current + forecast in ONE call (days=2 -> today +
            // tomorrow)
            String url = UriComponentsBuilder.fromHttpUrl(forecastUrl)
                    .queryParam("key", apiKey)
                    .queryParam("q", location)
                    .queryParam("days", 2)
                    .queryParam("aqi", "no")
                    .queryParam("alerts", "no")
                    .toUriString();

            String rawResponse = restTemplate.getForObject(url, String.class);
            JsonNode root = mapper.readTree(rawResponse);

            JsonNode current = root.path("current");
            double currentTemp = current.path("temp_c").asDouble();
            int humidity = current.path("humidity").asInt();
            String currentConditionText = current.path("condition").path("text").asText("Clear");

            JsonNode forecastDays = root.path("forecast").path("forecastday");
            // index 0 = today, index 1 = tomorrow
            JsonNode tomorrow = forecastDays.size() > 1 ? forecastDays.get(1) : forecastDays.get(0);
            JsonNode day = tomorrow.path("day");

            double tomorrowHigh = day.path("maxtemp_c").asDouble();
            double tomorrowLow = day.path("mintemp_c").asDouble();
            int tomorrowRainChance = day.path("daily_chance_of_rain").asInt();
            String tomorrowConditionText = day.path("condition").path("text").asText("Clear");

            return WeatherResponseDTO.builder()
                    .location(location)
                    .currentTemp(round1(currentTemp))
                    .currentCondition(currentConditionText)
                    .currentIcon(iconFor(currentConditionText))
                    .currentHumidity(humidity)
                    .tomorrowHigh(round1(tomorrowHigh))
                    .tomorrowLow(round1(tomorrowLow))
                    .tomorrowRainChance(tomorrowRainChance)
                    .tomorrowCondition(tomorrowConditionText)
                    .tomorrowIcon(iconFor(tomorrowConditionText))
                    .build();

        } catch (RestClientException e) {
            throw new RuntimeException("Weather service is temporarily unavailable.", e);
        } catch (Exception e) {
            throw new RuntimeException("Could not fetch weather for \"" + location + "\". Check the location name.", e);
        }
    }

    // WeatherAPI.com gives free-text conditions like "Partly cloudy", "Patchy rain
    // possible",
    // "Moderate rain", "Thundery outbreaks possible" -- so we match by keyword, not
    // exact code.
    private String iconFor(String conditionText) {
        if (conditionText == null)
            return "\u26C5"; // ⛅
        String c = conditionText.toLowerCase();
        if (c.contains("thunder"))
            return "\u26C8\uFE0F"; // ⛈️
        if (c.contains("snow") || c.contains("sleet") || c.contains("ice") || c.contains("blizzard"))
            return "\u2744\uFE0F"; // ❄️
        if (c.contains("rain") || c.contains("drizzle") || c.contains("shower"))
            return "\uD83C\uDF27\uFE0F"; // 🌧️
        if (c.contains("mist") || c.contains("fog") || c.contains("haze"))
            return "\uD83C\uDF2B\uFE0F"; // 🌫️
        if (c.contains("overcast") || c.contains("cloud"))
            return "\u26C5"; // ⛅
        if (c.contains("clear") || c.contains("sunny"))
            return "\u2600\uFE0F"; // ☀️
        return "\u26C5";
    }

    private double round1(double v) {
        return Math.round(v * 10.0) / 10.0;
    }
}