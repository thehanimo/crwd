import React from "react";
import Cookie from "js-cookie";
import { backendAPI, recommendationAPI } from "../../constants";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
  Nav,
  NavItem,
  NavLink,
} from "shards-react";
import Moment from "react-moment";
import Rating from "react-rating";
import { MessageSquare, Clock } from "react-feather";
import "loaders.css/loaders.css";
import SearchBar from "../Search/SearchBar";
import { renderBook, renderCourse, renderPlaylist } from "../Global/Global";
import ItemsCarousel from "react-items-carousel";
var Loader = require("react-loaders").Loader;

export default class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount = () => {
    setInterval(this.tick, 5000);
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(backendAPI + "/users/home", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      if (res.status === 401) {
        this.setState({ error: true });
      } else
        res.json().then((resJson) => {
          this.setState({ user: resJson });
        });
    });
  };

  tick = () =>
    this.setState((prevState) => ({
      activeItemIndex: prevState.activeItemIndex + 1,
    }));

  render() {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";

    return (
      <React.Fragment>
        <Container>
          <h3 className="bebas" style={{ marginTop: 60, fontSize: 40 }}>
            Favourite Books 📚
          </h3>
          <Row>
            {this.state.user.profileinfo &&
              this.state.user.profileinfo.favouriteBooks.map((item, index) =>
                renderBook(item)
              )}
          </Row>

          {this.state.user.profileinfo &&
            this.state.user.profileinfo.favouriteBooks.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  marginTop: 80,
                  marginBottom: 100,
                }}
              >
                <b>No favourite books.</b>
              </p>
            )}
          <h3 className="bebas" style={{ marginTop: 60, fontSize: 40 }}>
            Favourite Courses 👩🏽‍💻
          </h3>
          {this.state.user.profileinfo &&
            this.state.user.profileinfo.favouriteCourses.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  marginTop: 80,
                  marginBottom: 100,
                }}
              >
                <b>No favourite courses.</b>
              </p>
            )}
          <Row>
            {this.state.user.profileinfo &&
              this.state.user.profileinfo.favouriteCourses.map((item, index) =>
                renderCourse(item)
              )}
          </Row>
          <h3 className="bebas" style={{ marginTop: 60, fontSize: 40 }}>
            Favourite Playlists 🗒
          </h3>
          {this.state.user.profileinfo &&
            this.state.user.profileinfo.favouritePlaylists.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  marginTop: 80,
                  marginBottom: 100,
                }}
              >
                <b>No favourite playlists.</b>
              </p>
            )}
          <Row>
            {this.state.user.profileinfo &&
              this.state.user.profileinfo.favouritePlaylists.map(
                (item, index) => renderPlaylist(item)
              )}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
