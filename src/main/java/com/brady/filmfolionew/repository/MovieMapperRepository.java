package com.brady.filmfolionew.repository;

import com.brady.filmfolionew.entity.MovieEntity;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;


public class MovieMapperRepository  implements RowMapper<MovieEntity> {
    @Override
    public MovieEntity mapRow(ResultSet rs, int rowNum) throws SQLException {

        //MovieEntity object
        MovieEntity movie = new MovieEntity();

        //get data straight from the current db
        movie.setId(rs.getInt("id"));
        movie.setTmdbId(rs.getInt("tmdb_id"));
        movie.setTitle(rs.getString("title"));
        movie.setRating(rs.getDouble("rating"));
        movie.setReleaseDate(rs.getString("release_date"));
        movie.setPosterUrl(rs.getString("poster_url"));
        movie.setSummary(rs.getString("summary"));

        //put the data into MovieEntity
        return movie;
    }
}
