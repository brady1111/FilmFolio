package com.brady.filmfolionew.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    //constructor
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //method to check if email exists in db
    public boolean emailExists(String email) {
        //1 if email exists
        //0 if email does not exist
        Integer count = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM users WHERE email = ?",
                Integer.class,
                email
        );
        return count != null && count > 0;
    }

    //method to save a new user to the db
    public void saveUser(String email, String password) {
        jdbcTemplate.update("INSERT INTO users (email,password) VALUES (?,?)",
        email,password
        );
    }

    //method to update a user's password
    public void updatePassword(String email, String password) {
        jdbcTemplate.update(
                "UPDATE users SET password = ? WHERE email = ?",
                password,
                email
        );
    }


    public String getPasswordByEmail(String email) {
        String sql = "SELECT password FROM users WHERE email = ?";

        List<String> results = jdbcTemplate.query(
                sql,
                (rs, rowNum) -> rs.getString("password"),
                email
        );

        if (results.isEmpty()) {
            return null;
        }

        return results.get(0);
    }

    //method to get a user's email by ID
    public String getEmailById(int userId) {
        return jdbcTemplate.queryForObject(
                "SELECT email FROM users WHERE id = ?",
                String.class,
                userId
        );
    }

}
