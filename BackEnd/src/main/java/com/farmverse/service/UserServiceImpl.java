package com.farmverse.service;

import com.farmverse.dto.UserRequestDTO;
import com.farmverse.dto.UserResponseDTO;
<<<<<<< HEAD
import com.farmverse.entity.Role;
import com.farmverse.entity.User;
import com.farmverse.exception.BadRequestException;
import com.farmverse.exception.ForbiddenException;
import com.farmverse.exception.ResourceNotFoundException;
=======
import com.farmverse.exception.ForbiddenException;
import com.farmverse.exception.ResourceNotFoundException;
import com.farmverse.entity.User;
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
import com.farmverse.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
<<<<<<< HEAD
import org.springframework.security.crypto.password.PasswordEncoder;
=======
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
<<<<<<< HEAD
    private final PasswordEncoder passwordEncoder;
=======
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504

    @Override
    @Transactional
    public UserResponseDTO createUser(UserRequestDTO userRequestDTO) {
<<<<<<< HEAD
        String rawRole = userRequestDTO.getRole();
        if (!Role.isValid(rawRole)) {
            throw new BadRequestException("Invalid role. Allowed roles: ADMIN, FARM_MANAGER, GUEST");
        }
        String normalizedRole = Role.normalize(rawRole);

        String fullName = userRequestDTO.getFullName() != null && !userRequestDTO.getFullName().trim().isEmpty()
                ? userRequestDTO.getFullName().trim()
                : (userRequestDTO.getUsername() != null && !userRequestDTO.getUsername().trim().isEmpty()
                        ? userRequestDTO.getUsername().trim()
                        : userRequestDTO.getEmail().trim());

        String username = userRequestDTO.getUsername() != null && !userRequestDTO.getUsername().trim().isEmpty()
                ? userRequestDTO.getUsername().trim()
                : fullName;

        String phone = userRequestDTO.getPhoneNumber() != null ? userRequestDTO.getPhoneNumber() : userRequestDTO.getPhone();

        User user = User.builder()
                .fullName(fullName)
                .username(username)
                .email(userRequestDTO.getEmail().trim())
                .phoneNumber(phone)
                .password(passwordEncoder.encode(userRequestDTO.getPassword()))
                .role(normalizedRole)
=======
        User user = User.builder()
                .username(userRequestDTO.getUsername())
                .email(userRequestDTO.getEmail())
                .password(userRequestDTO.getPassword())
                .role(userRequestDTO.getRole())
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                .build();

        return toResponseDTO(userRepository.save(user));
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO getUserById(Long id) {
        return userRepository.findById(id)
                .map(this::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    @Transactional
    public UserResponseDTO updateUser(Long id, UserRequestDTO userRequestDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String loggedInEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        String loggedInRole = SecurityContextHolder.getContext().getAuthentication().getAuthorities().iterator().next().getAuthority();

        if (!loggedInRole.equals("ROLE_ADMIN") && !user.getEmail().equals(loggedInEmail)) {
            throw new ForbiddenException("You can only update your own profile");
        }

<<<<<<< HEAD
        String rawRole = userRequestDTO.getRole();
        if (rawRole != null) {
            if (!Role.isValid(rawRole)) {
                throw new BadRequestException("Invalid role. Allowed roles: ADMIN, FARM_MANAGER, GUEST");
            }
            user.setRole(Role.normalize(rawRole));
        }

        if (userRequestDTO.getFullName() != null) {
            user.setFullName(userRequestDTO.getFullName().trim());
        }
        if (userRequestDTO.getUsername() != null) {
            user.setUsername(userRequestDTO.getUsername().trim());
        }
        if (userRequestDTO.getEmail() != null) {
            user.setEmail(userRequestDTO.getEmail().trim());
        }
        String phone = userRequestDTO.getPhoneNumber() != null ? userRequestDTO.getPhoneNumber() : userRequestDTO.getPhone();
        if (phone != null) {
            user.setPhoneNumber(phone);
        }
        if (userRequestDTO.getPassword() != null && !userRequestDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        }
=======
        user.setUsername(userRequestDTO.getUsername());
        user.setEmail(userRequestDTO.getEmail());
        user.setPassword(userRequestDTO.getPassword());
        user.setRole(userRequestDTO.getRole());
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504

        return toResponseDTO(userRepository.save(user));
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found");
        }
        userRepository.deleteById(id);
    }

    private UserResponseDTO toResponseDTO(User user) {
        return UserResponseDTO.builder()
                .id(user.getId())
<<<<<<< HEAD
                .fullName(user.getFullName() != null ? user.getFullName() : user.getUsername())
                .username(user.getUsername())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
=======
                .username(user.getUsername())
                .email(user.getEmail())
>>>>>>> 1f0e22b0c9128fd588c6bd8d88cf4cb855622504
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}