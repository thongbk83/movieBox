import React from "react";
import { mount } from "enzyme";
import { Movie } from "../Movie/Movie";
import Seat from "../Seats/Seat";

import { MemoryRouter } from "react-router-dom";

it("Seats page has valid childrens with mount", () => {
    const propsMock = {
        getMovie: jest.fn(),
        getBookedSeats: jest.fn(),
        movie: {
            movie: { id: 123, poster_path: "image1.jpg" },
            bookedSeats: ["A1", "A2", "E3"],
            loading: false
        },

        match: { params: { id: 1 } }
    };

    const wrapper = mount(
        <MemoryRouter>
            <Movie {...propsMock} />
        </MemoryRouter>
    );

    expect(wrapper.find(Seat).find('[name="A1"]').length).toEqual(1);
    expect(wrapper.find('div[className="seat vip reservable"]').length).toEqual(
        2
    );
    expect(wrapper.find('div[className="seat reservable"]').length).toEqual(1);

    expect(
        wrapper
            .find(Seat)
            .find('[name="A1"]')
            .find('div[className="seat vip reservable"]').length
    ).toEqual(1);
    expect(
        wrapper
            .find(Seat)
            .find('[name="A2"]')
            .find('div[className="seat vip reservable"]').length
    ).toEqual(1);
    expect(
        wrapper
            .find(Seat)
            .find('[name="E3"]')
            .find('div[className="seat reservable"]').length
    ).toEqual(1);

    // expect(wrapper.find(Seats).length).toEqual(1);
    // console.log(wrapper.debug());
});
