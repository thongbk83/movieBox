import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Movies from "./components/Movies/Movies";
import Movie from "./components/Movie/Movie";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Route exact path="/" component={Movies}></Route>
                    <Route path="/movie/:id" component={Movie}></Route>
                </Fragment>
            </Router>
            <ToastContainer />
        </Provider>
    );
};

export default App;
