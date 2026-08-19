package com.brady.filmfolionew.controller;

import com.brady.filmfolionew.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //POST request for signup
    @PostMapping("/signup")
    public void signup(
            //put values into email and password
            @RequestParam String email,
            @RequestParam String password
    ) {
        userService.signup(email, password); //pass to service
    }

    //POST request for login
    @PostMapping("/login")
    public String login(
            @RequestParam String email,
            @RequestParam String password
    ) {
        return userService.login(email, password);
    }
}
