import {
    GET_MOVIES,
    GET_MOVIES_ERROR,
    GET_MOVIE,
    BOOKING_TICKET,
    GET_BOOKED_TICKET
} from "./actionTypes";
import axios from "axios";
import { tmdbConfig } from "../config/config";

// Get all movies
export const getMovies = () => async dispatch => {
    try {
        const res = await axios.get(
            `${tmdbConfig.API_URL_NOW_PLAYING}?api_key=${tmdbConfig.API_KEY}&language=en-US&page=1`
        );
        dispatch({
            type: GET_MOVIES,
            payload: res.data.results
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_MOVIES_ERROR,
            payload: {
                msg: err.response.status_message,
                status: err.response.success
            }
        });
    }
};

// Get all movies
export const getMovie = id => async dispatch => {
    try {
        const res = await axios.get(
            `${tmdbConfig.API_URL_MOVIE}/${id}?api_key=${tmdbConfig.API_KEY}&language=en-US`
        );

        dispatch({
            type: GET_MOVIE,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_MOVIES_ERROR,
            payload: {
                msg: err.response.status_message,
                status: err.response.success
            }
        });
    }
};

// booing ticket
export const bookingTickets = bookingData => async dispatch => {
    try {
        const res = await axios.post(
            "https://moviebox-ccc6e.firebaseio.com/bookingTicket.json",
            JSON.stringify(bookingData)
        );

        dispatch({
            type: BOOKING_TICKET,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_MOVIES_ERROR,
            payload: {
                msg: err.response.status_message,
                status: err.response.success
            }
        });
    }
};

//https://moviebox-ccc6e.firebaseio.com/bookingTicket.json?orderBy="showTimeId"&equalTo="showTime1"
export const getBookedSeats = movieId => async dispatch => {
    try {
        const queryParams = `orderBy="movieId"&equalTo=${movieId}`;
        const res = await axios.get(
            `https://moviebox-ccc6e.firebaseio.com/bookingTicket.json?${queryParams}`
        );

        let bookedTickets = Object.values(res.data);
        let bookedSeats = [];
        bookedTickets.forEach(
            ticket => (bookedSeats = [...bookedSeats, ...ticket.bookedSeats])
        );

        dispatch({
            type: GET_BOOKED_TICKET,
            payload: bookedSeats
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: GET_MOVIES_ERROR,
            payload: {
                msg: err.response.status_message,
                status: err.response.success
            }
        });
    }
};
