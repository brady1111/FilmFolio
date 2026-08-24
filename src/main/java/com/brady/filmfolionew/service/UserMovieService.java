package com.brady.filmfolionew.service;

import com.brady.filmfolionew.entity.MovieEntity;
import com.brady.filmfolionew.repository.UserMovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserMovieService {
    private final UserMovieRepository userMovieRepository;

    //constructor
    public UserMovieService(UserMovieRepository userMovieRepository) {
        this.userMovieRepository = userMovieRepository;
    }

    //method to save a movie for a user
    public void saveMovie(int userId, int movieId) {
        userMovieRepository.saveMovie(userId, movieId);
    }

    //method to get all saved movies for a user
    public List<MovieEntity> getSavedMovies(int userId) {
        return userMovieRepository.getSavedMovies(userId);
    }

}
