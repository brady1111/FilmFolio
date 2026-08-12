package com.brady.filmfolionew.dto;


import com.brady.filmfolionew.tmdb.TmdbMovie;

public class Movie {

    //data members
    private int id;
    private double rating;
    private String title;
    private String releaseDate;
    private String posterUrl;
    private String summary;

    public Movie() {
    }

    //constructor
    public Movie(int id, double rating, String title,
                 String releaseDate, String posterUrl, String summary) {
        this.id = id;
        this.rating = rating;
        this.title = title;
        this.releaseDate = releaseDate;
        this.posterUrl = posterUrl;
        this.summary = summary;
    }

    //get and set data members
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getReleaseDate() {
        return releaseDate;
    }
    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public double getRating() {
        return rating;
    }
    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getPosterUrl() {
        return posterUrl;
    }
    public void setPosterUrl(String posterUrl) {
        this.posterUrl = posterUrl;
    }

    public String getSummary() {
        return summary;
    }
    public void setSummary(String summary) {
        this.summary = summary;
    }
}

