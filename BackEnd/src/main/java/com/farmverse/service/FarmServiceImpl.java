package com.farmverse.service;

import com.farmverse.dto.FarmRequestDTO;
import com.farmverse.dto.FarmResponseDTO;
import com.farmverse.exception.ForbiddenException;
import com.farmverse.exception.ResourceNotFoundException;
import com.farmverse.entity.Farm;
import com.farmverse.entity.User;
import com.farmverse.repository.FarmRepository;
<<<<<<< HEAD
=======
import com.farmverse.repository.CropRepository;
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
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
<<<<<<< HEAD
=======
    private final CropRepository cropRepository;
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504

    @Override
    @Transactional
    public FarmResponseDTO createFarm(FarmRequestDTO farmRequestDTO) {
        User owner = userRepository.findById(farmRequestDTO.getOwnerId())
                .orElseThrow(() -> new ResourceNotFoundException("Owner not found"));

<<<<<<< HEAD
        String farmerName = farmRequestDTO.getFarmerName() != null && !farmRequestDTO.getFarmerName().trim().isEmpty()
                ? farmRequestDTO.getFarmerName().trim()
                : (owner.getFullName() != null && !owner.getFullName().trim().isEmpty() ? owner.getFullName().trim() : owner.getUsername());

        Farm farm = Farm.builder()
                .farmName(farmRequestDTO.getFarmName())
                .farmerName(farmerName)
                .location(farmRequestDTO.getLocation())
                .area(farmRequestDTO.getArea())
                .areaUnit(farmRequestDTO.getAreaUnit() != null ? farmRequestDTO.getAreaUnit() : "Acres")
                .waterSource(farmRequestDTO.getWaterSource() != null ? farmRequestDTO.getWaterSource() : "Borewell")
                .status(farmRequestDTO.getStatus() != null ? farmRequestDTO.getStatus() : "Healthy")
                .owner(owner)
                .build();
=======
        Farm farm = Farm.builder()
        .farmName(farmRequestDTO.getFarmName())
        .location(farmRequestDTO.getLocation())
        .area(farmRequestDTO.getArea())
        .currentCrop(farmRequestDTO.getCurrentCrop())
        .waterSource(farmRequestDTO.getWaterSource())
        .status(farmRequestDTO.getStatus())
        .owner(owner)
        .build();
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504

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
<<<<<<< HEAD

        String farmerName = farmRequestDTO.getFarmerName() != null && !farmRequestDTO.getFarmerName().trim().isEmpty()
            ? farmRequestDTO.getFarmerName().trim()
            : (owner.getFullName() != null && !owner.getFullName().trim().isEmpty() ? owner.getFullName().trim() : owner.getUsername());

        farm.setFarmName(farmRequestDTO.getFarmName());
        farm.setFarmerName(farmerName);
        farm.setLocation(farmRequestDTO.getLocation());
        farm.setArea(farmRequestDTO.getArea());
        if (farmRequestDTO.getAreaUnit() != null) farm.setAreaUnit(farmRequestDTO.getAreaUnit());
        if (farmRequestDTO.getWaterSource() != null) farm.setWaterSource(farmRequestDTO.getWaterSource());
        if (farmRequestDTO.getStatus() != null) farm.setStatus(farmRequestDTO.getStatus());
        farm.setOwner(owner);
=======
        
            farm.setFarmName(farmRequestDTO.getFarmName());
farm.setLocation(farmRequestDTO.getLocation());
farm.setArea(farmRequestDTO.getArea());
farm.setCurrentCrop(farmRequestDTO.getCurrentCrop());
farm.setWaterSource(farmRequestDTO.getWaterSource());
farm.setStatus(farmRequestDTO.getStatus());
farm.setOwner(owner);
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504

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

<<<<<<< HEAD
=======
        cropRepository.deleteAll(farm.getCrops());
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
        farmRepository.deleteById(id);
    }

    private FarmResponseDTO toResponseDTO(Farm farm) {
<<<<<<< HEAD
        String farmerName = farm.getFarmerName() != null && !farm.getFarmerName().trim().isEmpty()
                ? farm.getFarmerName()
                : (farm.getOwner() != null && farm.getOwner().getFullName() != null ? farm.getOwner().getFullName() : (farm.getOwner() != null ? farm.getOwner().getUsername() : ""));

        return FarmResponseDTO.builder()
                .farmId(farm.getFarmId())
                .farmName(farm.getFarmName())
                .farmerName(farmerName)
                .location(farm.getLocation())
                .area(farm.getArea())
                .areaUnit(farm.getAreaUnit() != null ? farm.getAreaUnit() : "Acres")
                .waterSource(farm.getWaterSource() != null ? farm.getWaterSource() : "Borewell")
                .status(farm.getStatus() != null ? farm.getStatus() : "Healthy")
                .ownerId(farm.getOwner().getId())
                .ownerUsername(farm.getOwner().getUsername())
=======
        return FarmResponseDTO.builder()
                .farmId(farm.getFarmId())
                .farmName(farm.getFarmName())
                .location(farm.getLocation())
                .area(farm.getArea())
                .ownerId(farm.getOwner().getId())
                .ownerUsername(farm.getOwner().getUsername())
                .currentCrop(farm.getCurrentCrop())
                .waterSource(farm.getWaterSource())
                .status(farm.getStatus())
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                .build();
    }
}