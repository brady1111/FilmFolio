package com.brady.filmfolionew.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class PasswordResetTokenRepository {
    private final JdbcTemplate jdbcTemplate;

    //constructor
    public PasswordResetTokenRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //method to save a password reset token
    public void saveToken(int userId, String token) {
        //token expires 30 minutes after creation
        jdbcTemplate.update(
                "INSERT INTO password_reset_tokens (user_id, token, expires_at) " +
                        "VALUES (?, ?, DATEADD('MINUTE', 30, CURRENT_TIMESTAMP))",
                userId,
                token
        );
    }

    //method to find a password reset token
    //method to find a password reset token
    public Map<String, Object> findToken(String token) {

        String sql = "SELECT id, user_id, token, expires_at " +
                "FROM password_reset_tokens " +
                "WHERE token = ? AND expires_at > CURRENT_TIMESTAMP";

        try {
            return jdbcTemplate.queryForMap(sql, token);
        } catch (Exception e) {
            return null;
        }
    }

    //method to delete a password reset token
    public void deleteToken(String token) {
        jdbcTemplate.update(
                "DELETE FROM password_reset_tokens WHERE token = ?",
                token
        );
    }
}
