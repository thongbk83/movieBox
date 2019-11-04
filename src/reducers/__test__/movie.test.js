import movieReducer from "../movie";
import {
    GET_MOVIE,
    GET_MOVIES,
    BOOKING_TICKET,
    GET_BOOKED_TICKET
} from "../../actions/actionTypes";

describe("Movie REDUCER", () => {
    it("handle actions of type default", () => {
        const exptectedState = {
            movie: null,
            bookedSeats: [],
            movies: [],
            loading: true,
            error: {}
        };

        const newState = movieReducer(undefined, {});
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type GET_MOVIE", () => {
        const action = {
            type: GET_MOVIE,
            payload: { id: 1 }
        };

        const exptectedState = {
            movie: { id: 1 },
            error: {},
            loading: false,
            bookedSeats: [],
            movies: []
        };

        const newState = movieReducer(undefined, action);
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type GET_MOVIES", () => {
        const action = {
            type: GET_MOVIES,
            payload: [{ id: 1 }]
        };

        const exptectedState = {
            movie: null,
            error: {},
            loading: false,
            bookedSeats: [],
            movies: [{ id: 1 }]
        };

        const newState = movieReducer(undefined, action);
        expect(newState).toEqual(exptectedState);
    });

    it("handle actions of type GET_BOOKED_TICKET", () => {
        const action = {
            type: GET_BOOKED_TICKET,
            payload: [{ id: 1 }]
        };

        const exptectedState = {
            movie: null,
            error: {},
            loading: false,
            bookedSeats: [{ id: 1 }],
            movies: []
        };

        const newState = movieReducer(undefined, action);
        expect(newState).toEqual(exptectedState);
    });
});
