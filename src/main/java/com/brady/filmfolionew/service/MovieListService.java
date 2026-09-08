package com.brady.filmfolionew.service;

import com.brady.filmfolionew.dto.MovieDto;
import com.brady.filmfolionew.entity.MovieEntity;
import com.brady.filmfolionew.entity.MovieListEntity;
import com.brady.filmfolionew.repository.MovieRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.List;

@Service
public class MovieListService {
    private final JdbcTemplate jdbcTemplate;
    private final MovieRepository movieRepository;

    public MovieListService(JdbcTemplate jdbcTemplate, MovieRepository movieRepository) {
        this.jdbcTemplate = jdbcTemplate;
        this.movieRepository = movieRepository;
    }

    //method to create a new movie list
    public void createList(String name, String summary, Long userId) {
        String sql = "INSERT INTO movie_lists (name, summary, user_id) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, name, summary, userId);
    }

    //method to get all movie lists for a user
    public List<MovieListEntity> getListsByUser(Long userId) {
        String sql = "SELECT id, name, summary FROM movie_lists WHERE user_id = ?";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            MovieListEntity movieList = new MovieListEntity();

            movieList.setId(rs.getLong("id"));
            movieList.setName(rs.getString("name"));
            movieList.setSummary(rs.getString("summary"));
            return movieList; }, userId);
    }

    //method to add a movie to a list
    public void addMovieToList(Long listId, MovieDto movieDto) {
        MovieEntity existingMovie = movieRepository.getMovieByTmdbId(movieDto.getId());
        int movieId;

        if(existingMovie == null) {
            MovieEntity movie = new MovieEntity();

            movie.setTmdbId(movieDto.getId());
            movie.setTitle(movieDto.getTitle());
            movie.setRating(movieDto.getRating());
            movie.setReleaseDate(movieDto.getReleaseDate());
            movie.setPosterUrl(movieDto.getPosterUrl());
            movie.setSummary(movieDto.getSummary());
            movieRepository.addMovie(movie);
            MovieEntity savedMovie = movieRepository.getMovieByTmdbId(movieDto.getId());
            movieId = savedMovie.getId();
        }else{
            movieId = existingMovie.getId();
        }

        //check if movie is already in the list
        String checkSql = "SELECT COUNT(*) FROM list_movies WHERE list_id = ? AND movie_id = ?";
        Integer count = jdbcTemplate.queryForObject(
                checkSql,
                Integer.class,
                listId,
                movieId
        );

        if(count != null && count > 0) {
            throw new IllegalArgumentException(
                    "Movie is already in this list."
            );
        }
        //add movie to the list
        String sql = "INSERT INTO list_movies (list_id, movie_id) VALUES (?, ?)";
        jdbcTemplate.update(
                sql,
                listId,
                movieId
        );
    }

    public List<Map<String, Object>> getMoviesByList(Long listId) {
        String sql = """
            SELECT m.id, m.tmdb_id, m.title, m.rating,
            m.release_date, m.poster_url, m.summary FROM movies m
            JOIN list_movies lm ON m.id = lm.movie_id
            WHERE lm.list_id = ?
            """;

        return jdbcTemplate.queryForList(sql, listId);
    }

    //method to delete a movie from a selected list
    public void removeMovieFromList(Long listId, Long movieId) {
        String sql = "DELETE FROM list_movies WHERE list_id = ? AND movie_id = ?";
        jdbcTemplate.update(sql, listId, movieId);
    }

    //method to update a selected list
    public void updateList(Long listId, String name, String summary) {
        String sql = "UPDATE movie_lists SET name = ?, summary = ? WHERE id = ?";
        jdbcTemplate.update(sql, name, summary, listId);
    }

    //method to delete a movie list
    public void deleteList(Long listId) {
        String deleteMoviesSql = "DELETE FROM list_movies WHERE list_id = ?";
        jdbcTemplate.update(deleteMoviesSql, listId);

        String deleteListSql = "DELETE FROM movie_lists WHERE id = ?";
        jdbcTemplate.update(deleteListSql, listId);
    }

    //method to get the Favorites list for a user
    public MovieListEntity getFavoritesList(Long userId) {

        String sql =
                "SELECT id, name, summary FROM movie_lists " +
                        "WHERE user_id = ? AND name = 'Favorites'";

        List<MovieListEntity> lists = jdbcTemplate.query(
                sql,
                (rs, rowNum) -> {
                    MovieListEntity movieList = new MovieListEntity();

                    movieList.setId(rs.getLong("id"));
                    movieList.setName(rs.getString("name"));
                    movieList.setSummary(rs.getString("summary"));
                    return movieList;
                },
                userId
        );

        if(lists.isEmpty()) {
            String insertSql = "INSERT INTO movie_lists " +
                            "(name, summary, user_id) " +
                            "VALUES ('Favorites', 'Your top 5 favorite movies.', ?)";

            jdbcTemplate.update(insertSql, userId
            );

            lists = jdbcTemplate.query(sql, (rs, rowNum) -> {
                        MovieListEntity movieList = new MovieListEntity();

                        movieList.setId(rs.getLong("id"));
                        movieList.setName(rs.getString("name"));
                        movieList.setSummary(rs.getString("summary"));

                        return movieList;
                    },
                    userId);
        }
        return lists.get(0);
    }

    //method to add a movie to Favorites
    public void addMovieToFavorites(Long userId, MovieDto movieDto) {
        MovieListEntity favoritesList = getFavoritesList(userId);

        Long listId = favoritesList.getId();

        MovieEntity existingMovie = movieRepository.getMovieByTmdbId(movieDto.getId());

        int movieId;
        if(existingMovie == null) {
            MovieEntity movie = new MovieEntity();

            movie.setTmdbId(movieDto.getId());
            movie.setTitle(movieDto.getTitle());
            movie.setRating(movieDto.getRating());
            movie.setReleaseDate(movieDto.getReleaseDate());
            movie.setPosterUrl(movieDto.getPosterUrl());
            movie.setSummary(movieDto.getSummary());

            movieRepository.addMovie(movie);
            MovieEntity savedMovie = movieRepository.getMovieByTmdbId(movieDto.getId());
            movieId = savedMovie.getId();
        }else{
            movieId = existingMovie.getId();
        }

        //check if movie is already in Favorites
        String checkSql = "SELECT COUNT(*) FROM list_movies WHERE list_id = ? AND movie_id = ?";
        Integer count = jdbcTemplate.queryForObject(checkSql, Integer.class, listId, movieId);
        if(count != null && count > 0) {
            throw new IllegalArgumentException(
                    "Movie is already in your Favorites."
            );
        }

        //check the Favorites movie limit
        String countSql = "SELECT COUNT(*) FROM list_movies WHERE list_id = ?";

        Integer favoriteCount = jdbcTemplate.queryForObject(countSql, Integer.class, listId);
        if(favoriteCount != null && favoriteCount >= 5) {
            throw new IllegalArgumentException("You can only have 5 favorite movies.");
        }
        //add movie to Favorites
        String sql = "INSERT INTO list_movies (list_id, movie_id) VALUES (?, ?)";
        jdbcTemplate.update(sql, listId, movieId);
    }

    //method to get Favorites movies
    public List<Map<String, Object>> getFavoriteMovies(Long userId) {
        MovieListEntity favoritesList = getFavoritesList(userId);
        return getMoviesByList(favoritesList.getId()
        );
    }

    //method to remove a movie from Favorites
    public void removeMovieFromFavorites(Long userId, Long movieId) {
        MovieListEntity favoritesList = getFavoritesList(userId);
        String sql = "DELETE FROM list_movies WHERE list_id = ? AND movie_id = ?";
        jdbcTemplate.update(sql, favoritesList.getId(), movieId);
    }
}
