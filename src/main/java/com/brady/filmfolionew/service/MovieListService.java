package com.brady.filmfolionew.service;

import com.brady.filmfolionew.entity.MovieListEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.List;

@Service
public class MovieListService {

    private final JdbcTemplate jdbcTemplate;

    public MovieListService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    //method to create a new movie list
    public void createList(String name, Long userId) {
        String sql = "INSERT INTO movie_lists (name, user_id) VALUES (?, ?)";
        jdbcTemplate.update(sql, name, userId);
    }

    //method to get all movie lists for a user
    public List<MovieListEntity> getListsByUser(Long userId) {
        String sql = "SELECT id, name FROM movie_lists WHERE user_id = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            MovieListEntity movieList = new MovieListEntity();

            movieList.setId(rs.getLong("id"));
            movieList.setName(rs.getString("name"));
            return movieList; }, userId);
    }

    public void addMovieToList(Long listId, Long movieId) {
        String sql = " INSERT INTO list_movies (list_id, movie_id) VALUES (?, ?)";
        jdbcTemplate.update(sql, listId, movieId);
    }

    public List<Map<String, Object>> getMoviesByList(Long listId) {

        String sql = """
            SELECT m.id, m.tmdb_id, m.title, m.rating,
                   m.release_date, m.poster_url, m.summary
            FROM movies m
            JOIN list_movies lm ON m.id = lm.movie_id
            WHERE lm.list_id = ?
            """;

        return jdbcTemplate.queryForList(sql, listId);
    }
}