import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import { Movies } from "../Movies/Movies";

it("Movies page has valid childrens", () => {
    const propsMock = {
        getMovies: jest.fn(),
        movie: {
            movies: [
                { id: 123, poster_path: "image1.jpg" },
                { id: 234, poster_path: "image2.jpg" }
            ],
            loading: false
        }
    };

    const wrapper = shallow(<Movies {...propsMock} />);

    //show 2 movie
    expect(wrapper.find('div[className="movie-grid-element"]').length).toEqual(
        2
    );
    expect(wrapper.find(Link).length).toEqual(2);
    expect(
        wrapper.find('img[src="http://image.tmdb.org/t/p/w500image1.jpg"]')
            .length
    ).toEqual(1);
    expect(
        wrapper.find('img[src="http://image.tmdb.org/t/p/w500image2.jpg"]')
            .length
    ).toEqual(1);
});
