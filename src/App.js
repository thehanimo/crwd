import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Landing from "./Components/Landing/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import NavBar from "./Components/NavBar/NavBar";

export default function App() {
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
          <Route path="/landing">
            <Landing />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        false ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
