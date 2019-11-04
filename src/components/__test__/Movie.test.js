import React from "react";
import { shallow, mount } from "enzyme";
import { Link } from "react-router-dom";
import { Movie } from "../Movie/Movie";
import MovieInfo from "../Movie/MovieInfo";
import Seats from "../Seats/Seats";
import App from "../../App";
import { MemoryRouter } from "react-router-dom";

it("Movie page has valid childrens", () => {
    const propsMock = {
        getMovie: jest.fn(),
        getBookedSeats: jest.fn(),
        movie: {
            movie: { id: 123, poster_path: "image1.jpg" },
            bookedSeats: ["A1", "A2", "A3"],
            loading: false
        },

        match: { params: { id: 1 } }
    };

    const wrapper = shallow(<Movie {...propsMock} />);

    expect(wrapper.find(MovieInfo).length).toEqual(1);
    expect(wrapper.find(Seats).length).toEqual(1);
});
