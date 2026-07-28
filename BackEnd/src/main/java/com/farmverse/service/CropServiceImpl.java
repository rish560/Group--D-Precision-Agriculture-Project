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

        Crop crop = Crop.builder()
                .cropName(cropRequestDTO.getCropName())
                .season(cropRequestDTO.getSeason())
                .farm(farm)
                .build();

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

        crop.setCropName(cropRequestDTO.getCropName());
        crop.setSeason(cropRequestDTO.getSeason());
        crop.setFarm(farm);

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
        return CropResponseDTO.builder()
                .cropId(crop.getCropId())
                .cropName(crop.getCropName())
                .season(crop.getSeason())
                .farmId(crop.getFarm().getFarmId())
                .farmName(crop.getFarm().getFarmName())
                .build();
    }
}