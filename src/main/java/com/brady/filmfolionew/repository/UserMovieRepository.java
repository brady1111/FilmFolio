package com.brady.filmfolionew.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.brady.filmfolionew.entity.MovieEntity;
import java.util.List;

@Repository
public class UserMovieRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserMovieRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //method to save a movie for a user
    public void saveMovie(int userId, int movieId) {
        jdbcTemplate.update("INSERT INTO user_movies (user_id, movie_id) VALUES (?,?)",
                userId, movieId
        );
    }

    //method to get a list of movies saved by a user
    public List<MovieEntity> getSavedMovies(int userId) {
        String sql = "SELECT m.id, m.tmdb_id, m.title, m.summary, m.rating," +
                "m.release_date, m.poster_url FROM movies m" +
                " JOIN user_movies um ON m.id = um.movie_id WHERE um.user_id = ?";

        return jdbcTemplate.query(
                sql,
                new MovieMapperRepository(),
                userId
        );
    }

}
