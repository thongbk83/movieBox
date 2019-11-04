import React, { Fragment, useState, useEffect } from "react";
import "./Seats.css";
import setAlert from "../../utils/setAlert";

const Seat = ({
    name,
    type,
    isSelected,
    isBooked,
    seletedSeats,
    bookedSeats,
    onSelected
}) => {
    const [seatStyle, setSeatStyle] = useState("seat");
    const [status, setStatus] = useState("empty");

    useEffect(() => {
        let style = type === "vip" ? "seat vip" : "seat";
        if (!!bookedSeats.find(bookedSeat => name === bookedSeat)) {
            setStatus("reservable");
            style = style + " reservable";
        }
        setSeatStyle(style);
    }, [isBooked, bookedSeats, type]);

    const clickHandler = () => {
        if (status === "reservable") return;
        if (status !== "selected") {
            if (seletedSeats.length > 5) {
                setAlert("Sorry, the maximum booking tickets is 6!", "error");
                return;
            }
            const currentStatus = seatStyle;
            setSeatStyle(currentStatus + " selected");
            setStatus("selected");
        } else if (status === "selected") {
            const currentStatus = seatStyle;
            setSeatStyle(currentStatus.replace("selected", "").trim());
            setStatus("empty");
        }

        onSelected(name, type);
    };

    return (
        <Fragment>
            <div className={seatStyle} onClick={clickHandler}>
                {name}
            </div>
        </Fragment>
    );
};

export default Seat;
