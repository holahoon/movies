import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES":
      return {
        ...state,
        movie_list: action.payload,
        title: "Search Results"
      };
    case "POPULAR_MOVIES":
      return {
        ...state,
        movie_list: action.payload,
        title: "Popular Movies"
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  constructor() {
    super();
    this.state = {
      movie_list: [],
      title: "Popular Movies",
      dispatch: action => this.setState(state => reducer(state, action))
    };
  }

  componentDidMount() {
    const popular_movies_url = `
      https://api.themoviedb.org/3/movie/popular?api_key=${
        process.env.REACT_APP_MOVIEDB_API_KEY
      }&language=en-US&page=1`;

    axios
      .get(popular_movies_url)
      .then(res => {
        this.setState({
          movie_list: res.data.results
        });
      })
      .catch(err => console.log("Error: ", err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
