package com.brady.filmfolionew.controller;

import com.brady.filmfolionew.service.MovieListService;
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
            @RequestParam Long userId) {
        movieListService.createList(name, userId);
    }

    @GetMapping
    public List<MovieListEntity> getLists(@RequestParam Long userId) {
        return movieListService.getListsByUser(userId);
    }

    @PostMapping("/movies")
    public void addMovieToList(
            @RequestParam Long listId,
            @RequestBody MovieDto movie) {
        movieListService.addMovieToList(listId, movie);
    }

    @GetMapping("/movies")
    public List<Map<String, Object>> getMoviesByList(@RequestParam Long listId) {
        return movieListService.getMoviesByList(listId);
    }
}