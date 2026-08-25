package com.brady.filmfolionew.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    //method to send email to user
    public void sendPasswordResetEmail(String email, String resetLink) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);
        message.setSubject("Reset Your FilmFolio Password");

        message.setText(
                "Hello,\n\n" +
                        "We received a request to reset the password for your FilmFolio account.\n\n" +
                        "Click the link below to create a new password:\n\n" +
                        resetLink + "\n\n" +
                        "This link will expire in 15 minutes.\n\n" +
                        "If you did not request a password reset, you can safely ignore this email.\n\n" +
                        "Thanks,\n" +
                        "The FilmFolio Team"
        );

        mailSender.send(message);
    }
}
