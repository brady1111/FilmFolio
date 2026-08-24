package com.brady.filmfolionew.service;

import com.brady.filmfolionew.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ForgotPasswordService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final Map<String, ResetToken> resetTokens = new ConcurrentHashMap<>();

    public ForgotPasswordService(UserRepository userRepository,
                                 PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private static class ResetToken {
        private final String email;
        private final long expirationTime;

        public ResetToken(String email) {
            this.email = email;
            this.expirationTime = System.currentTimeMillis()
                    + (15 * 60 * 1000);
        }

        public String getEmail() {
            return email;
        }

        public boolean isExpired() {
            return System.currentTimeMillis() > expirationTime;
        }
    }

    public String createResetToken(String email) {

        if (!userRepository.emailExists(email)) {
            return null;
        }

        String token = UUID.randomUUID().toString();

        resetTokens.put(token, new ResetToken(email));

        return token;
    }

    public boolean resetPassword(String token, String newPassword) {

        ResetToken resetToken = resetTokens.get(token);

        if (resetToken == null) {
            return false;
        }

        if (resetToken.isExpired()) {
            resetTokens.remove(token);
            return false;
        }

        String hashedPassword = passwordEncoder.encode(newPassword);

        userRepository.updatePassword(
                resetToken.getEmail(),
                hashedPassword
        );

        resetTokens.remove(token);

        return true;
    }
}
