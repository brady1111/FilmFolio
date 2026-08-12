package com.brady.filmfolionew.tmdb;

import java.util.List;

public class TmdbSearchResponse {

    //data member
    private List<TmdbMovie> results;

    public TmdbSearchResponse() {
    }

    //getter and setter
    public List<TmdbMovie> getResults() {
        return results;
    }
    public void setResults(List<TmdbMovie> results) {
        this.results = results;
    }
}
