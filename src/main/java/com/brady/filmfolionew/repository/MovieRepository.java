package com.brady.filmfolionew.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.brady.filmfolionew.entity.MovieEntity;

import java.util.List;

@Repository
public class MovieRepository {
    private final JdbcTemplate jdbcTemplate;

    //constructor
    public MovieRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //method to add a movie to the db
    public void addMovie(MovieEntity movie) {
        jdbcTemplate.update(
                "INSERT INTO movies " +
                        "(tmdb_id, title, rating, release_date, poster_url, summary)" +
                        "VALUES (?,?,?,?,?,?,?)",

                movie.getTmdbId(),
                movie.getTitle(),
                movie.getRating(),
                movie.getReleaseDate(),
                movie.getPosterUrl(),
                movie.getSummary()

        );
    }

}

