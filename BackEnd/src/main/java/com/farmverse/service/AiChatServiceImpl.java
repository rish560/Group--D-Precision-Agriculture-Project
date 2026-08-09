package com.farmverse.service;

import com.farmverse.dto.ChatRequestDTO;
import com.farmverse.dto.ChatResponseDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Service
public class AiChatServiceImpl implements AiChatService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.model}")
    private String model;

    private static final String SYSTEM_PROMPT = """
            You are FarmVerse AI, a friendly and knowledgeable farming assistant built into the
            FarmVerse precision agriculture platform for Indian farmers and farm managers.
            Rules:
            - Give short, practical, actionable advice (max 4-5 sentences).
            - Focus on: crop care, pest/disease identification, soil health, irrigation, and
              weather-based actions.
            - If the issue sounds serious (major crop loss risk, unknown disease, large-scale
              infestation), advise contacting the local agricultural extension office.
            - Never recommend specific banned or restricted pesticides.
            - Use simple, farmer-friendly language, avoid jargon.
            - If a crop or location is provided, tailor the advice to it.
            - Keep a warm, encouraging tone -- you are a trusted advisor, not a search engine.
            - IMPORTANT: Always reply in the SAME language the farmer used to ask the question.
              If they write in Hindi, reply fully in Hindi (Devanagari script). If they write in
              Tamil, Telugu, Marathi, or any other Indian language, reply in that same language.
              If they mix languages (e.g. Hinglish), reply in a similarly natural mixed style.
            """;

    @Override
    public ChatResponseDTO getAdvice(ChatRequestDTO request) {
        String userContext = """
                Crop: %s
                Location: %s
                Preferred language: %s
                Question: %s
                """.formatted(
                orDefault(request.getCrop(), "not specified"),
                orDefault(request.getLocation(), "not specified"),
                orDefault(request.getLanguage(), "English"),
                request.getQuestion());

        Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                        Map.of("role", "system", "content", SYSTEM_PROMPT),
                        Map.of("role", "user", "content", userContext)),
                "max_tokens", 300,
                "temperature", 0.4);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            String rawResponse = restTemplate.postForObject(apiUrl, entity, String.class);
            JsonNode root = mapper.readTree(rawResponse);
            String answer = root.path("choices").get(0)
                    .path("message").path("content").asText().trim();

            return ChatResponseDTO.builder()
                    .answer(answer)
                    .timestamp(Instant.now().toString())
                    .build();

        } catch (RestClientException e) {
            throw new RuntimeException("FarmVerse AI is temporarily unavailable. Please try again.", e);
        } catch (Exception e) {
            throw new RuntimeException("Failed to process AI response: " + e.getMessage(), e);
        }
    }

    private String orDefault(String val, String fallback) {
        return (val == null || val.isBlank()) ? fallback : val;
    }
}
