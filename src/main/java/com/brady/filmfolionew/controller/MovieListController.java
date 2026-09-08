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

    @PutMapping
    public void updateList(
            @RequestParam Long listId,
            @RequestParam String name,
            @RequestParam(required = false, defaultValue = "Your movie list.") String summary) {

        movieListService.updateList(listId, name, summary);
    }

    @DeleteMapping
    public void deleteList(@RequestParam Long listId) {
        movieListService.deleteList(listId);
    }

    //get the Favorites list
    @GetMapping("/favorites")
    public MovieListEntity getFavorites(
            @RequestParam Long userId) {
        return movieListService.getFavoritesList(userId);
    }

    //add a movie to Favorites
    @PostMapping("/favorites")
    public ResponseEntity<String> addMovieToFavorites(
            @RequestParam Long userId,
            @RequestBody MovieDto movie) {

        try {
            movieListService.addMovieToFavorites(userId, movie);

            return ResponseEntity.ok("Movie added to Favorites.");
        }catch(IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //get all favorite movies
    @GetMapping("/favorites/movies")
    public List<Map<String, Object>> getFavoriteMovies(
            @RequestParam Long userId) {
        return movieListService.getFavoriteMovies(userId);
    }

    //remove a movie from Favorites
    @DeleteMapping("/favorites/movies")
    public void removeMovieFromFavorites(
            @RequestParam Long userId,
            @RequestParam Long movieId) {
        movieListService.removeMovieFromFavorites(userId, movieId
        );
    }
}