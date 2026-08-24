package com.brady.filmfolionew.controller;

import com.brady.filmfolionew.entity.MovieEntity;
import com.brady.filmfolionew.service.UserMovieService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-movies")
public class UserMovieController {
    private final UserMovieService userMovieService;

    //constructor
    public UserMovieController(UserMovieService userMovieService) {
        this.userMovieService = userMovieService;
    }

    //method to save a movie for a user
    @PostMapping("/save")
    public void saveMovie(
            @RequestParam int userId,
            @RequestParam int movieId) {
        userMovieService.saveMovie(userId, movieId);
    }

    //method to get all saved movies for a user
    @GetMapping("/{userId}")
    public List<MovieEntity> getSavedMovies(@PathVariable int userId) {
        return userMovieService.getSavedMovies(userId);
    }
}
