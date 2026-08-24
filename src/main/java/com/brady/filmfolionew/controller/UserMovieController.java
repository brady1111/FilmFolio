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

    @PostMapping("/save")
    public void saveMovie(
            @RequestParam int userId,
            @RequestBody MovieEntity movie) {

        userMovieService.saveMovie(userId, movie);
    }

    @DeleteMapping("/remove")
    public void removeMovie(
            @RequestParam int userId,
            @RequestParam int movieId) {

        userMovieService.removeMovie(userId, movieId);
    }

    //method to get all saved movies for a user
    @GetMapping("/{userId}")
    public List<MovieEntity> getSavedMovies(@PathVariable int userId) {
        return userMovieService.getSavedMovies(userId);
    }
}
