import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getMovie, getBookedSeats } from "../../actions/movie";
import MovieInfo from "./MovieInfo";
import Seats from "../Seats/Seats";

import "./Movie.css";

export const Movie = ({
    getMovie,
    getBookedSeats,
    movie: { movie, bookedSeats, loading },
    match
}) => {
    useEffect(() => {
        getMovie(match.params.id);
        getBookedSeats(match.params.id);
    }, [getMovie, getBookedSeats, match.params.id]);

    return (
        <Fragment>
            {movie === null || loading ? (
                <Spinner></Spinner>
            ) : (
                <div className="rmdb-movie">
                    <div className="rmdb-navigation">
                        <div className="rmdb-navigation-content">
                            <Link to="/">
                                <p>Home</p>
                            </Link>
                            <p>/</p>
                            <p>{movie.original_title}</p>
                        </div>
                    </div>
                    <MovieInfo movie={movie} />

                    <Seats movie={movie} bookedSeats={bookedSeats}></Seats>
                </div>
            )}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    movie: state.movie
});

export default connect(
    mapStateToProps,
    { getMovie, getBookedSeats }
)(Movie);
