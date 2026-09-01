package com.brady.filmfolionew.controller;

import com.brady.filmfolionew.service.MovieListService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.brady.filmfolionew.entity.MovieListEntity;
import com.brady.filmfolionew.dto.MovieDto;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/lists")
@CrossOrigin(origins = "http://localhost:63342")
public class MovieListController {
    private final MovieListService movieListService;

    public MovieListController(MovieListService movieListService) {
        this.movieListService = movieListService;
    }

    @PostMapping
    public void createList(
            @RequestParam String name,
            @RequestParam(required = false, defaultValue = "Your movie list.") String summary,
            @RequestParam Long userId) {
        movieListService.createList(name, summary, userId);
    }

    @GetMapping
    public List<MovieListEntity> getLists(@RequestParam Long userId) {
        return movieListService.getListsByUser(userId);
    }

    @PostMapping("/movies")
    public ResponseEntity<String> addMovieToList(
            @RequestParam Long listId,
            @RequestBody MovieDto movie) {

        try {
            movieListService.addMovieToList(listId, movie);
            return ResponseEntity.ok("Movie added successfully.");
        }catch(IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/movies")
    public List<Map<String, Object>> getMoviesByList(@RequestParam Long listId) {
        return movieListService.getMoviesByList(listId);
    }

    @DeleteMapping("/movies")
    public void removeMovieFromList(
            @RequestParam Long listId,
            @RequestParam Long movieId) {
        movieListService.removeMovieFromList(listId, movieId);
    }
}