package com.brady.filmfolionew.controller;

import com.brady.filmfolionew.dto.MovieDto;
import com.brady.filmfolionew.service.TmdbService;
import com.brady.filmfolionew.tmdb.TmdbMovie;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovieController {

    private final TmdbService tmdbService;

    public MovieController(TmdbService tmdbService) {
        this.tmdbService = tmdbService;
    }

    @GetMapping("/search")
    public List<MovieDto> search(@RequestParam String title) {
        return tmdbService.searchMovies(title);
    }

    @GetMapping("/movie/{id}")
    public MovieDto getMovie(@PathVariable int id) {
        TmdbMovie tmdbMovie = tmdbService.getMovieId(id);
        MovieDto movie = new MovieDto();

        movie.setId(tmdbMovie.getId());
        movie.setTitle(tmdbMovie.getTitle());
        movie.setSummary(tmdbMovie.getOverview());
        movie.setReleaseDate(tmdbMovie.getReleaseDate());
        movie.setRating(tmdbMovie.getVoteAverage());
        movie.setPosterUrl(
                "https://image.tmdb.org/t/p/w500" + tmdbMovie.getPosterPath()
        );

        return movie;
    }
}

