import React, { Component } from "react";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import YouTube from "react-youtube";
import Modal from "react-modal";

Modal.setAppElement("#root");

class MovieInfo extends Component {
  constructor() {
    super();
    this.state = {
      movie_info: {},
      play_movie: "",
      modal: false
    };
  }

  componentDidMount() {
    const movies_url = `https://api.themoviedb.org/3/movie/${
      this.props.match.params.id
    }?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`;

    axios
      .get(movies_url)
      .then(res => {
        this.setState({ movie_info: res.data });
      })
      .catch(err => console.log("Movie Info Error: ", err));
  }

  // convert time from minutes to h:mm
  convertTime = min => {
    let h = Math.floor(min / 60);
    let m = min % 60;
    m = m < 10 ? "0" + m : m;
    return `${h}hr ${m}min`;
  };

  // load api to direct to movie trailer on Youtube
  movieTrailer = id => {
    const play_movie_url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&language=en-US`;

    axios
      .get(play_movie_url)
      .then(res => {
        // Check to see if the movie trailer name is the same as the movie title(id)
        const { results } = res.data;
        for (let key in results) {
          if (results.hasOwnProperty(key)) {
            const movie_name = results[key].name.toLowerCase();
            const state_movie_name = this.state.movie_info.title.toLowerCase();
            if (movie_name.includes(state_movie_name)) {
              this.setState({ play_movie: results[key].key });
              break;
            }
          }
        }
      })
      .catch(err => console.log("Play Movie Error: ", err));
  };

  // Toggle modal
  toggleModal = () => {
    this.setState(prevState => ({ modal: !prevState.modal }));
  };

  render() {
    const {
      id,
      backdrop_path,
      poster_path,
      title,
      release_date,
      runtime,
      overview,
      genres
    } = this.state.movie_info;

    // movie genres loop to display on the screen
    const genres_list = [];
    for (let key in genres) {
      if (genres.hasOwnProperty(key)) {
        genres_list.push(genres[key]);
      }
    }
    const display_genres = genres_list.map(genre => (
      <li key={genre.id}>{genre.name}</li>
    ));

    // For Youtube video (screen width, height)
    const video_options_lg = {
      height: "500px",
      width: "800px"
    };
    const video_options_sm = {
      height: "240px",
      width: "365px"
    };

    if (
      this.state.movie_info === undefined ||
      this.state.movie_info.length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <div
            className="movie-info-container"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${backdrop_path})`
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
              alt=""
            />
            <div className="movie-info-body">
              <Link to="/movies" className="back-to-main-page-btn">
                <i className="far fa-times-circle" />
              </Link>

              <h1>{title}</h1>
              <p>
                <strong>Duration: </strong>
                {this.convertTime(runtime)}
              </p>
              <ul>
                <strong>Genres: </strong>
                {display_genres}
              </ul>
              <p className="p-overview">
                <strong>Overview: </strong>
                {overview}
              </p>
              <p>
                <strong>Release date: </strong>
                {moment(release_date).format("MMM Do, YYYY")}
              </p>

              <div>
                <button
                  onClick={() => {
                    this.movieTrailer(id);
                    this.toggleModal();
                  }}
                  className="modal-open-button"
                >
                  <i className="fas fa-play" style={{ marginRight: "8px" }} />
                  play trailer
                </button>
                <Modal isOpen={this.state.modal} className="modal-custom">
                  <button
                    onClick={this.toggleModal}
                    className="modal-close-button"
                  >
                    <i className="far fa-times-circle" />
                  </button>
                  <YouTube
                    videoId={this.state.play_movie}
                    opts={
                      window.innerWidth > 450
                        ? video_options_lg
                        : video_options_sm
                    }
                  />
                </Modal>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

// <YouTube videoId={this.state.play_movie} />
export default MovieInfo;
