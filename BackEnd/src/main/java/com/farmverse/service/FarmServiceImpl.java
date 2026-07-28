package com.farmverse.service;

import com.farmverse.dto.FarmRequestDTO;
import com.farmverse.dto.FarmResponseDTO;
import com.farmverse.exception.ForbiddenException;
import com.farmverse.exception.ResourceNotFoundException;
import com.farmverse.entity.Farm;
import com.farmverse.entity.User;
import com.farmverse.repository.FarmRepository;
import com.farmverse.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FarmServiceImpl implements FarmService {

    private final FarmRepository farmRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public FarmResponseDTO createFarm(FarmRequestDTO farmRequestDTO) {
        User owner = userRepository.findById(farmRequestDTO.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        Farm farm = Farm.builder()
                .farmName(farmRequestDTO.getFarmName())
                .location(farmRequestDTO.getLocation())
                .area(farmRequestDTO.getArea())
                .owner(owner)
                .build();

        return toResponseDTO(farmRepository.save(farm));
    }

    @Override
    public List<FarmResponseDTO> getAllFarms() {
        return farmRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public FarmResponseDTO getFarmById(Long id) {
        return farmRepository.findById(id)
                .map(this::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Farm not found"));
    }

    @Override
    @Transactional
    public FarmResponseDTO updateFarm(Long id, FarmRequestDTO farmRequestDTO) {
        Farm farm = farmRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Farm not found"));

        String loggedInEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        String loggedInRole = SecurityContextHolder.getContext().getAuthentication().getAuthorities().iterator().next().getAuthority();

        if (!loggedInRole.equals("ROLE_ADMIN") && !farm.getOwner().getEmail().equals(loggedInEmail)) {
            throw new ForbiddenException("You can only update your own farms");
        }

        User owner = userRepository.findById(farmRequestDTO.getOwnerId())
            .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

        farm.setFarmName(farmRequestDTO.getFarmName());
        farm.setLocation(farmRequestDTO.getLocation());
        farm.setArea(farmRequestDTO.getArea());
        farm.setOwner(owner);

        return toResponseDTO(farmRepository.save(farm));
    }

    @Override
    @Transactional
    public void deleteFarm(Long id) {
        Farm farm = farmRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Farm not found"));

        String loggedInEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        String loggedInRole = SecurityContextHolder.getContext().getAuthentication().getAuthorities().iterator().next().getAuthority();

        if (!loggedInRole.equals("ROLE_ADMIN") && !farm.getOwner().getEmail().equals(loggedInEmail)) {
            throw new ForbiddenException("You can only delete your own farms");
        }

        farmRepository.deleteById(id);
    }

    private FarmResponseDTO toResponseDTO(Farm farm) {
        return FarmResponseDTO.builder()
                .farmId(farm.getFarmId())
                .farmName(farm.getFarmName())
                .location(farm.getLocation())
                .area(farm.getArea())
                .ownerId(farm.getOwner().getId())
                .ownerUsername(farm.getOwner().getUsername())
                .build();
    }
}