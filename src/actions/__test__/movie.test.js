import React from "react";
import thunk from "redux-thunk";

import configureMockStore from "redux-mock-store";
import mockAxios from "axios";
import { getMovies, getMovie, getBookedSeats } from "../movie";

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("test movie actions", () => {
    beforeEach(() => {
        store = mockStore();
    });

    it("getMovies", async done => {
        const mockData = {
            results: [{ id: 1, name: "movie1" }, { id: 2, name: "movie2" }]
        };

        const expectedAction = {
            type: "GET_MOVIES",
            payload: [{ id: 1, name: "movie1" }, { id: 2, name: "movie2" }]
        };

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockData })
        );

        await store.dispatch(getMovies());

        // assertions / expects
        expect(store.getActions()[0]).toEqual(expectedAction);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
        done();
    });

    it("getMovie", async done => {
        const mockData = {
            id: "abc",
            name: "movie1"
        };

        const expectedAction = {
            type: "GET_MOVIE",
            payload: {
                id: "abc",
                name: "movie1"
            }
        };

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockData })
        );

        await store.dispatch(getMovie("abc"));

        // assertions / expects
        expect(store.getActions()[0]).toEqual(expectedAction);
        done();
    });

    it("getBookedSeats", async done => {
        const mockData = {
            "-LspN_BV_KGioEhAKxhP": {
                amount: 50,
                bookedSeats: ["A6", "B9", "B10"],
                movieId: 475557,
                phoneNumber: "0982341227",
                showTimeId: "showTime1",
                theaterId: "theater1"
            },
            "-LspNlj74HPrrWRHqINR": {
                amount: 30,
                bookedSeats: ["A1", "A9"],
                movieId: 475557,
                phoneNumber: "0982341227",
                showTimeId: "showTime1",
                theaterId: "theater1"
            }
        };

        const expectedAction = {
            type: "GET_BOOKED_TICKET",
            payload: ["A6", "B9", "B10", "A1", "A9"]
        };

        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({ data: mockData })
        );

        await store.dispatch(getBookedSeats("abc"));

        // assertions / expects
        expect(store.getActions()[0]).toEqual(expectedAction);
        done();
    });
});
