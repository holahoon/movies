import React, { Component } from "react";
import Movie from "./Movie";
import Spinner from "../layouts/Spinner";
import { Consumer } from "../../Context";

class Movies extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { movie_list } = value;

          if (movie_list === undefined || movie_list.length === 0) {
            return <Spinner />;
          } else {
            return (
              <div className="list-container">
                {movie_list.map(movie => (
                  <Movie key={movie.id} mov={movie} />
                ))}
              </div>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Movies;
