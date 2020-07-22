import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { LinkedInPopUp } from "react-linkedin-login-oauth2";

import "./App.css";
import Home from "./Components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import NavBar from "./Components/NavBar/NavBar";
import Login from "./Components/Login/Login";
import Cookie from "js-cookie";
import Books from "./Components/Books/Books";
import Book from "./Components/Books/Book/Book";
import Courses from "./Components/Courses/Courses";
import Course from "./Components/Courses/Course/Course";
import Playlists from "./Components/Playlists/Playlists";
import Playlist from "./Components/Playlists/Playlist/Playlist";
import CreatePlaylist from "./Components/Playlists/CreatePlaylist/CreatePlaylist";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />

          {/* <ul>
          <li>
            <Link to="/home">Public Page</Link>
          </li>
          <li>
            <Link to="/landing">Protected Page</Link>
          </li>
        </ul> */}

          <Switch>
            <Route exact path="/">
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/books">
              <Books />
            </PrivateRoute>
            <PrivateRoute path="/book/:id">
              <Book />
            </PrivateRoute>
            <PrivateRoute exact path="/courses">
              <Courses />
            </PrivateRoute>
            <PrivateRoute path="/course/:id">
              <Course />
            </PrivateRoute>
            <PrivateRoute exact path="/playlists">
              <Playlists />
            </PrivateRoute>
            <PrivateRoute path="/playlist/create">
              <CreatePlaylist />
            </PrivateRoute>
            <PrivateRoute path="/playlist/:id">
              <Playlist />
            </PrivateRoute>
            <PrivateRoute path="/home">
              <Home />
            </PrivateRoute>
            <Route exact path="/linkedin" component={LinkedInPopUp} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function PrivateRoute({ children, ...rest }) {
  const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
  return (
    <Route
      {...rest}
      render={({ location }) =>
        JWT != "null" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
