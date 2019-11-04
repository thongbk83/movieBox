import React from "react";
import { tmdbConfig } from "../../config/config";
import PropTypes from "prop-types";
import "./Movie.css";

const MovieInfo = ({ movie }) => {
    const { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } = tmdbConfig;
    return (
        <div
            className="rmdb-movieinfo"
            style={{
                background: movie.backdrop_path
                    ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`
                    : "#000"
            }}
        >
            <div className="rmdb-movieinfo-content">
                <div className="rmdb-movieinfo-thumb">
                    <div key={movie.id} className="movie-moviethumb">
                        <img
                            src={
                                movie.poster_path
                                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : "./images/no_image.jpg"
                            }
                            alt="moviethumb"
                        />
                    </div>
                </div>
                <div className="rmdb-movieinfo-text">
                    <h1>{movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{movie.overview}</p>
                    <h3>IMDB RATING</h3>
                    <div className="rmdb-rating">
                        <meter
                            min="0"
                            max="100"
                            optimum="100"
                            low="40"
                            high="70"
                            value={movie.vote_average * 10}
                        ></meter>
                        <p className="rmdb-score">{movie.vote_average}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

MovieInfo.propTypes = {
    movie: PropTypes.object,
    directors: PropTypes.array
};

export default MovieInfo;
