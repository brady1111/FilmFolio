package com.brady.filmfolionew.service;

//Holds API key

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.brady.filmfolionew.dto.Movie;
import com.brady.filmfolionew.tmdb.TmdbMovie;
import com.brady.filmfolionew.tmdb.TmdbSearchResponse;

import java.util.ArrayList;
import java.util.List;

@Service
public class TmdbService {

    @Value("${tmdb.api.key}") //gets the API key
    private String apiKey; //holds the API key

    private final RestTemplate restTemplate;
    //image base for posters
    private static final String IMAGE_BASE_URL =
            "https://image.tmdb.org/t/p/w500";

    //constructor
    public TmdbService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    //method to search for a movie
    public List<Movie> searchMovies(String title) {
        String url = "https://api.themoviedb.org/3/search/movie"
                + "?api_key=" + apiKey
                + "&query=" + title;
        TmdbSearchResponse response = restTemplate.getForObject(url, TmdbSearchResponse.class);

        //list that holds movies
        List<Movie> movies = new ArrayList<>();

        //loop through each resulted movie from TMDB
        for (TmdbMovie tmdbMovie : response.getResults()) {

            //create movie
            Movie movie = new Movie();

            //get data from TMDB
            movie.setId(tmdbMovie.getId());
            movie.setTitle(tmdbMovie.getTitle());
            movie.setSummary(tmdbMovie.getOverview());
            movie.setReleaseDate(tmdbMovie.getReleaseDate());
            movie.setRating(tmdbMovie.getVoteAverage());
            movie.setPosterUrl(IMAGE_BASE_URL
                    + tmdbMovie.getPosterPath());

            //add movie to movies list
            movies.add(movie);
        }
        //return list of movies
        return movies;
    }

    public TmdbMovie getMovieId(int id) {

        String url = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + apiKey;

        return restTemplate.getForObject(url, TmdbMovie.class);
    }
}

