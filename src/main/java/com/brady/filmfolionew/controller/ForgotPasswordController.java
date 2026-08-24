package com.brady.filmfolionew.controller;

import com.brady.filmfolionew.service.ForgotPasswordService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/forgot-password")
public class ForgotPasswordController {

    private final ForgotPasswordService forgotPasswordService;

    //constructor
    public ForgotPasswordController(ForgotPasswordService forgotPasswordService) {
        this.forgotPasswordService = forgotPasswordService;
    }

    //request a password reset
    @PostMapping("/request")
    public String requestReset(@RequestParam String email) {

        String token = forgotPasswordService.createResetToken(email);

        if (token == null) {
            return "If an account with that email exists, a reset link has been created.";
        }

        return token;
    }

    //reset the password
    @PostMapping("/reset")
    public String resetPassword(
            @RequestParam String token,
            @RequestParam String newPassword) {

        boolean success = forgotPasswordService.resetPassword(token, newPassword);

        if (!success) {
            return "Invalid or expired reset token.";
        }
        return "Password successfully changed.";
    }
}