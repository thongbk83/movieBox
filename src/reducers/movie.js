import {
    GET_MOVIES,
    GET_MOVIES_ERROR,
    GET_MOVIE,
    GET_BOOKED_TICKET
} from "../actions/actionTypes";

const initialState = {
    movie: null,
    bookedSeats: [],
    movies: [],
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_MOVIE:
            return {
                ...state,
                movie: payload,
                loading: false
            };
        case GET_MOVIES:
            return {
                ...state,
                movies: payload,
                loading: false
            };
        case GET_MOVIES_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case GET_BOOKED_TICKET:
            return {
                ...state,
                bookedSeats: payload,
                loading: false
            };
        default:
            return state;
    }
}
