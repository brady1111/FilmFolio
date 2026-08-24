package com.brady.filmfolionew.service;

import com.brady.filmfolionew.entity.MovieEntity;
import com.brady.filmfolionew.repository.MovieRepository;
import com.brady.filmfolionew.repository.UserMovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserMovieService {

    private final UserMovieRepository userMovieRepository;
    private final MovieRepository movieRepository;

    //constructor
    public UserMovieService(UserMovieRepository userMovieRepository,
                            MovieRepository movieRepository) {
        this.userMovieRepository = userMovieRepository;
        this.movieRepository = movieRepository;
    }

    //method to save a movie for a user
    public void saveMovie(int userId, MovieEntity movie) {
        //check if movie already exists in the database
        MovieEntity existingMovie =
                movieRepository.getMovieByTmdbId(movie.getTmdbId());
        int movieId;

        if (existingMovie == null) {
            //add the movie
            movieRepository.addMovie(movie);

            //get the movie that was just added
            MovieEntity savedMovie =
                    movieRepository.getMovieByTmdbId(movie.getTmdbId());

            movieId = savedMovie.getId();
        } else {
            //movie already exists
            movieId = existingMovie.getId();
        }
        //connect the movie to the user
        userMovieRepository.saveMovie(userId, movieId);
    }

    //method to remove a movie from a user's saved movies
    public void removeMovie(int userId, int movieId) {
        userMovieRepository.removeMovie(userId, movieId);
    }

    //method to get all saved movies for a user
    public List<MovieEntity> getSavedMovies(int userId) {
        return userMovieRepository.getSavedMovies(userId);
    }
}
