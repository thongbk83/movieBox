import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useHistory } from "react-router-dom";
import setAlert from "../../utils/setAlert";
import { bookingTickets } from "../../actions/movie";

const Checkout = ({
    description,
    amount,
    theaterId,
    showTimeId,
    movieId,
    phoneNumber,
    seletedSeats,
    bookingTickets
}) => {
    let history = useHistory();
    console.log(amount);
    const onToken = (token, addresses) => {
        console.log(
            token,
            " the token have to post to server and make progress to complete payment. as scope document, we wont implement server. "
        );

        setAlert("thank you for booking.", "success");

        const bookingData = {
            theaterId,
            showTimeId,
            movieId,
            phoneNumber,
            amount,
            bookedSeats: seletedSeats
        };

        bookingTickets(bookingData);

        setTimeout(() => {
            history.push("/");
        }, 500);
    };

    return (
        <StripeCheckout
            amount={amount * 100} // cent to usd
            currency="USD"
            stripeKey="pk_test_WxV5TlZScW09OqCIxAvikD8D00FNeJwfNb"
            token={onToken}
            billingAddress
            description={description}
            name="test"
            locale="auto"
            image="https://stripe.com/img/documentation/checkout/marketplace.png"
        />
    );
};

export default connect(
    null,
    { bookingTickets }
)(Checkout);
