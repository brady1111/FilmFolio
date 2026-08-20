package com.brady.filmfolionew.entity;

public class MovieEntity {

    private int id;
    private int tmdbId;
    private double rating;
    private String title;
    private String releaseDate;
    private String posterUrl;
    private String summary;

    public MovieEntity() {
    }

    public MovieEntity(int id, int tmdbId, double rating, String title,
                       String releaseDate, String posterUrl, String summary) {
        this.id = id;
        this.tmdbId = tmdbId;
        this.rating = rating;
        this.title = title;
        this.releaseDate = releaseDate;
        this.posterUrl = posterUrl;
        this.summary = summary;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTmdbId() {
        return tmdbId;
    }

    public void setTmdbId(int tmdbId) {
        this.tmdbId = tmdbId;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
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
