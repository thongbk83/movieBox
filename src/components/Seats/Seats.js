import React, { useState } from "react";
import "./Seats.css";
import { theater, seatType } from "../../mock/data";
import Seat from "./Seat";
import Checkout from "../Checkout/Checkout";

export const Seats = ({ movie, bookedSeats, loading }) => {
    const [seletedSeats, setSelectedSeats] = useState([]);
    const [total, setTotal] = useState(0);
    const [formData, setFormData] = useState({ name: "", phone: "" });
    const [zoom, setZoom] = useState(1);

    const { name, phone } = formData;

    const onSelectedSeatHandler = (value, type) => {
        if (seletedSeats.find(seat => seat === value)) {
            setSelectedSeats(seletedSeats.filter(seat => seat !== value));
            setTotal(total - parseInt(seatType[type]));
        } else {
            setSelectedSeats(seletedSeats.concat(value));
            setTotal(total + parseInt(seatType[type]));
        }
    };

    const onZoomHandler = (scale, out) => {
        let currentZoom = zoom;
        if (out) {
            setZoom(currentZoom * scale);
        } else {
            setZoom(currentZoom / scale);
        }
    };

    const onInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const renderSeats = () => {
        const rows = theater.rows;
        return rows.map(row => (
            <tr key={row.name}>
                {row.seats.map(seat => {
                    if (seat.name === "seatGap") {
                        return <td key={seat.name} className="seatGap"></td>;
                    }

                    return (
                        <td key={seat.name}>
                            <Seat
                                {...seat}
                                seletedSeats={seletedSeats}
                                bookedSeats={bookedSeats}
                                onSelected={onSelectedSeatHandler}
                            ></Seat>
                        </td>
                    );
                })}
            </tr>
        ));
    };

    const renderCheckoutButton = () => {
        if (name !== "" && phone !== "" && seletedSeats.length > 0) {
            return (
                <Checkout
                    amount={total}
                    description="book ticket"
                    theaterId={theater.theaterId}
                    showTimeId="showTime1"
                    movieId={movie.id}
                    phoneNumber={phone}
                    seletedSeats={seletedSeats}
                ></Checkout>
            );
        }
        return;
    };

    return (
        <div className="seatContainer" style={{ zoom: zoom }}>
            <h1>Movie Seat Selection</h1>
            <div className="container">
                <div className="w3ls-reg">
                    <div className="inputForm">
                        <h2>
                            fill the required details below and select your
                            seats
                        </h2>
                        <div className="divUserInfo">
                            <div className="divUserInfo-left">
                                <label>
                                    Name
                                    <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={onInputChange}
                                    required
                                />
                            </div>
                            <div className="divUserInfo-right">
                                <label>
                                    {" "}
                                    Phone
                                    <span>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    required
                                    onChange={onInputChange}
                                    value={phone}
                                />
                            </div>
                        </div>
                    </div>

                    <ul className="seat_w3ls">
                        <li className="smallBox greenBox">Selected Seat</li>

                        <li className="smallBox grayBox">Reserved Seat</li>

                        <li className="smallBox emptyBox">Empty Seat</li>
                        <li className="smallBox vipBox">VIP</li>
                        <li className="smallBox normalBox">Normal</li>
                    </ul>
                    <div className="zoomContainer">
                        <input
                            type="button"
                            value="zoom out (x2)"
                            onClick={() => onZoomHandler(2, true)}
                        />
                        <input
                            type="button"
                            value="zoom in (x2)"
                            onClick={() => onZoomHandler(2, false)}
                        />
                    </div>

                    <div className="seatStructure txt-center">
                        <table id="seatsBlock">
                            <tbody>{renderSeats()}</tbody>
                        </table>

                        <div className="screen">
                            <h2 className="wthree">Screen</h2>
                        </div>

                        <table className="Displaytable w3ls-table" width="100%">
                            <tbody>
                                <tr>
                                    <th>Selected Seats</th>
                                    <th>Total($)</th>
                                </tr>
                                <tr>
                                    <td>
                                        <span>{seletedSeats.join(",")}</span>
                                    </td>
                                    <td>
                                        <h3 className="total">{total}</h3>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="checkout">{renderCheckoutButton()}</div>
                </div>
            </div>
        </div>
    );
};

export default Seats;
