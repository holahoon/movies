import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

// Display '...' after certain length of words
const parseText = (text, limit) => {
  if (text.length > limit)
    for (let i = limit; i > 0; i--) {
      if (
        text.charAt(i) === " " &&
        (text.charAt(i - 1) !== "," ||
          text.charAt(i - 1) !== "." ||
          text.charAt(i - 1) !== ";")
      ) {
        return text.substring(0, i) + "...";
      }
    }
  else return text;
};

const Movie = props => {
  const { id, poster_path, title, release_date } = props.mov;

  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w185/${poster_path}`} alt="" />
      <div className="movie-card-body">
        <h5>{parseText(title, 20)}</h5>
        <p>({moment(release_date).format("YYYY")})</p>

        <Link to={`/movies/info/${id}`} className="info-button">
          <i className="fas fa-info-circle" /> More info
        </Link>
      </div>
    </div>
  );
};

export default Movie;
