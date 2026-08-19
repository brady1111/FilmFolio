package com.brady.filmfolionew.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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

    //method to get hashed password for an email
    public String getPasswordByEmail(String email) {
        return jdbcTemplate.queryForObject(
                "SELECT password FROM users WHERE email = ?",
                String.class, email
        );
    }
}
