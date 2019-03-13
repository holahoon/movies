import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./components/layouts/Index";
import MovieInfo from "./components/layouts/MovieInfo";
import Header from "./components/layouts/Header";
import { Provider } from "./Context";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <div className="App">
              <Header />

              <div>
                <Switch>
                  <Route exact path="/movies" component={Index} />
                  <Route path="/movies/info/:id" component={MovieInfo} />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
