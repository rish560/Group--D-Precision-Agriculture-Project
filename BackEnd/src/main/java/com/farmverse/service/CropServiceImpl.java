package com.farmverse.service;

import com.farmverse.dto.CropRequestDTO;
import com.farmverse.dto.CropResponseDTO;
import com.farmverse.exception.ForbiddenException;
import com.farmverse.exception.ResourceNotFoundException;
import com.farmverse.entity.Crop;
import com.farmverse.entity.Farm;
import com.farmverse.repository.CropRepository;
import com.farmverse.repository.FarmRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CropServiceImpl implements CropService {

    private final CropRepository cropRepository;
    private final FarmRepository farmRepository;

    @Override
    @Transactional
    public CropResponseDTO createCrop(CropRequestDTO cropRequestDTO) {
        Farm farm = farmRepository.findById(cropRequestDTO.getFarmId())
                .orElseThrow(() -> new ResourceNotFoundException("Farm not found"));

<<<<<<< HEAD
        String seasonVal = cropRequestDTO.getSeason() != null && !cropRequestDTO.getSeason().trim().isEmpty()
                ? cropRequestDTO.getSeason()
                : (cropRequestDTO.getStage() != null ? cropRequestDTO.getStage() : "Kharif");

        Crop crop = Crop.builder()
                .cropName(cropRequestDTO.getCropName())
                .season(seasonVal)
                .stage(cropRequestDTO.getStage() != null ? cropRequestDTO.getStage() : "Vegetative")
                .health(cropRequestDTO.getHealth() != null ? cropRequestDTO.getHealth() : "Excellent")
                .expectedYield(cropRequestDTO.getExpectedYield() != null ? cropRequestDTO.getExpectedYield() : "")
                .farm(farm)
                .build();
=======
       Crop crop = Crop.builder()
        .cropName(cropRequestDTO.getCropName())
        .season(cropRequestDTO.getSeason())
        .stage(cropRequestDTO.getStage())
        .health(cropRequestDTO.getHealth())
        .plantingDate(cropRequestDTO.getPlantingDate())
        .expectedYield(cropRequestDTO.getExpectedYield())
        .farm(farm)
        .build();
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504

        return toResponseDTO(cropRepository.save(crop));
    }

    @Override
    public List<CropResponseDTO> getAllCrops() {
        return cropRepository.findAll().stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CropResponseDTO getCropById(Long id) {
        return cropRepository.findById(id)
                .map(this::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Crop not found"));
    }

    @Override
    @Transactional
    public CropResponseDTO updateCrop(Long id, CropRequestDTO cropRequestDTO) {
        Crop crop = cropRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Crop not found"));

        String loggedInEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        String loggedInRole = SecurityContextHolder.getContext().getAuthentication().getAuthorities().iterator().next().getAuthority();

        if (!loggedInRole.equals("ROLE_ADMIN") && !crop.getFarm().getOwner().getEmail().equals(loggedInEmail)) {
            throw new ForbiddenException("You can only update crops on your own farms");
        }

        Farm farm = farmRepository.findById(cropRequestDTO.getFarmId())
            .orElseThrow(() -> new ResourceNotFoundException("Farm not found"));

<<<<<<< HEAD
        crop.setCropName(cropRequestDTO.getCropName());
        if (cropRequestDTO.getSeason() != null) crop.setSeason(cropRequestDTO.getSeason());
        if (cropRequestDTO.getStage() != null) crop.setStage(cropRequestDTO.getStage());
        if (cropRequestDTO.getHealth() != null) crop.setHealth(cropRequestDTO.getHealth());
        if (cropRequestDTO.getExpectedYield() != null) crop.setExpectedYield(cropRequestDTO.getExpectedYield());
        crop.setFarm(farm);
=======
            crop.setCropName(cropRequestDTO.getCropName());
crop.setSeason(cropRequestDTO.getSeason());
crop.setStage(cropRequestDTO.getStage());
crop.setHealth(cropRequestDTO.getHealth());
crop.setPlantingDate(cropRequestDTO.getPlantingDate());
crop.setExpectedYield(cropRequestDTO.getExpectedYield());
crop.setFarm(farm);
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504

        return toResponseDTO(cropRepository.save(crop));
    }

    @Override
    @Transactional
    public void deleteCrop(Long id) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crop not found"));

        String loggedInEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        String loggedInRole = SecurityContextHolder.getContext().getAuthentication().getAuthorities().iterator().next().getAuthority();

        if (!loggedInRole.equals("ROLE_ADMIN") && !crop.getFarm().getOwner().getEmail().equals(loggedInEmail)) {
            throw new ForbiddenException("You can only delete crops on your own farms");
        }

        cropRepository.deleteById(id);
    }

    private CropResponseDTO toResponseDTO(Crop crop) {
<<<<<<< HEAD
        String farmerName = "";
        if (crop.getFarm() != null) {
            if (crop.getFarm().getFarmerName() != null && !crop.getFarm().getFarmerName().trim().isEmpty()) {
                farmerName = crop.getFarm().getFarmerName();
            } else if (crop.getFarm().getOwner() != null) {
                farmerName = crop.getFarm().getOwner().getFullName() != null
                        ? crop.getFarm().getOwner().getFullName()
                        : crop.getFarm().getOwner().getUsername();
            }
        }

        return CropResponseDTO.builder()
                .cropId(crop.getCropId())
                .cropName(crop.getCropName())
                .season(crop.getSeason())
                .stage(crop.getStage() != null ? crop.getStage() : crop.getSeason())
                .health(crop.getHealth() != null ? crop.getHealth() : "Excellent")
                .expectedYield(crop.getExpectedYield() != null ? crop.getExpectedYield() : "")
                .farmId(crop.getFarm().getFarmId())
                .farmName(crop.getFarm().getFarmName())
                .farmerName(farmerName)
                .build();
=======
        return CropResponseDTO.builder()

            .cropId(crop.getCropId())
            .cropName(crop.getCropName())
            .season(crop.getSeason())
            .stage(crop.getStage())
            .health(crop.getHealth())
            .plantingDate(crop.getPlantingDate())
            .expectedYield(crop.getExpectedYield())
            .farmId(crop.getFarm().getFarmId())
            .farmName(crop.getFarm().getFarmName())
            .build();
              
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
    }
}