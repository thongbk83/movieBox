## Introduce

This project is booking movie ticket. Allow user select movie , choose seat and payment.

### Technical

-   This project implement with Reactjs , Redux , Redux-Thunk.
-   Applying Payment with stripe ( front end only , to complete need to implement on server side with express and stripe.)
-   Apply unit test with Jest , Enzyme for actions , reducer, component
-   Data store on Firebase and fetch from https://www.themoviedb.org/ , for Theater and Seats info I use mock data
-   CI/DI with github, travis CI , heroku
    -   travis CI : https://travis-ci.org/thongbk83/movieBox/builds
    -   heroku demo: https://tp-movie-box.herokuapp.com/

## Available Scripts

In the project directory, you can run:

### Install Project

-   npm install

### run project on local

-   npm start

### run unit test on local

-   npm run test

## How to use website

-   Select movie
-   Input name , phone number
-   Select seats ( maximun is 6/booking time)
-   Pay with creadit card via stripe
