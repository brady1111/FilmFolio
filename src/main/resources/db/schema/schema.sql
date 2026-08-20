CREATE TABLE IF NOT EXISTS users (
        id BIGINT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE IF NOT EXISTS movies (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    tmdb_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    rating DOUBLE,
    release_date VARCHAR(50),
    poster_url VARCHAR(500),
    summary VARCHAR(2000)
);

CREATE TABLE IF NOT EXISTS user_movies (
    user_id INT,
    movie_id INT,
    PRIMARY KEY (user_id, movie_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);
