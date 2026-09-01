package com.brady.filmfolionew.service;

import com.brady.filmfolionew.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //method to check if sign up is allowed
    public void signup(String email, String password) {
        if(userRepository.emailExists(email)) {
            throw new IllegalArgumentException("Email is already registered");
        }
        String hashedPassword = passwordEncoder.encode(password);
        userRepository.saveUser(email, hashedPassword);
    }

    public Map<String, Object> login(String email, String password) {
        String hashedPassword = userRepository.getPasswordByEmail(email);

        if(hashedPassword == null) {
            return Map.of(
                    "success", false,
                    "message", "Invalid email or password"
            );
        }

        if(!passwordEncoder.matches(password, hashedPassword)) {
            return Map.of(
                    "success", false,
                    "message", "Invalid email or password"
            );
        }
        int userId = userRepository.getUserIdByEmail(email);
        return Map.of(
                "success", true,
                "message", "Login successful",
                "userId", userId
        );
    }
}