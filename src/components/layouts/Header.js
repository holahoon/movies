import React from "react";
import axios from "axios";
import { Consumer } from "../../Context";
import { Link } from "react-router-dom";

const backToPopularMovies = dispatch => {
  const popular_movies_url = `
      https://api.themoviedb.org/3/movie/popular?api_key=${
        process.env.REACT_APP_MOVIEDB_API_KEY
      }&language=en-US&page=1`;

  axios
    .get(popular_movies_url)
    .then(res => {
      //   console.log("data: ", res.data.results);
      dispatch({
        type: "POPULAR_MOVIES",
        payload: res.data.results
      });
    })
    .catch(err => console.log("Header API Error: ", err));
};

const Header = () => {
  return (
    <Consumer>
      {value => {
        const { dispatch } = value;

        return (
          <header>
            <Link to="/movies">
              <h1
                onClick={backToPopularMovies.bind(this, dispatch)}
                className="main-header-h1"
              >
                Movies
              </h1>
            </Link>
          </header>
        );
      }}
    </Consumer>
  );
};

export default Header;
