import React, { Fragment, useEffect, Suspense } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovies } from "../../actions/movie";
import { tmdbConfig } from "../../config/config";
import "./Movies.css";

export const Movies = ({ getMovies, movie: { movies, loading } }) => {
    const { IMAGE_BASE_URL, POSTER_SIZE } = tmdbConfig;

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    const Spinner = React.lazy(() => import("../layout/Spinner"));

    const renderMovies = () => {
        return (
            <div className="movie-home-grid">
                <h1>Now Playing Movies</h1>
                <div className="movie-grid-content">
                    {movies.map((movie, i) => {
                        return (
                            <div key={movie.id} className="movie-grid-element">
                                <div className="movie-moviethumb">
                                    <Link
                                        to={{
                                            pathname: `movie/${movie.id}`
                                        }}
                                    >
                                        <img
                                            src={
                                                movie.poster_path
                                                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                                    : "./images/no_image.jpg"
                                            }
                                            alt="moviethumb"
                                        />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            <Suspense fallback={<div>Loading...</div>}>
                {loading ? <Spinner /> : <Fragment>{renderMovies()}</Fragment>}
            </Suspense>
        </Fragment>
    );
};

Movies.propTypes = {
    getMovies: PropTypes.func.isRequired,
    movie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    movie: state.movie
});

export default connect(
    mapStateToProps,
    { getMovies }
)(Movies);
