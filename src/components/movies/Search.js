import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../Context";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      movieSearch: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  search = (dispatch, event) => {
    event.preventDefault();
    // Load the movieDB api to perform search. The inputted value that has been stored in the state will be called to perform search.
    const base_url = "https://api.themoviedb.org";
    const search = `/3/search/movie?api_key=${
      process.env.REACT_APP_MOVIEDB_API_KEY
    }&query=${this.state.movieSearch}`;

    axios
      .get(`${base_url}${search}&page=1`)
      .then(response => {
        // console.log(response.data.results);
        if (response.data.results.length === 0) {
          this.setState({ movieSearch: "Movie(s) not found" });
          setTimeout(() => this.setState({ movieSearch: "" }), 1500);
          return;
        }
        dispatch({
          type: "SEARCH_MOVIES",
          payload: response.data.results
        });
        // this.setState({ movieSearch: "" });
      })
      .catch(error => console.log("Error: ", error));
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, title } = value;
          return (
            <div>
              <form
                onSubmit={this.search.bind(this, dispatch)}
                className="main-form"
              >
                <div className="form-group my-3 input-field">
                  <input
                    type="text"
                    placeholder="Search for a movie"
                    name="movieSearch"
                    onChange={this.handleChange}
                    value={this.state.movieSearch}
                  />
                  <button className="submit-button" type="submit">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </form>
              <h3 className="title">{title}</h3>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
