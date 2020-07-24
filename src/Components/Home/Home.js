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
var Loader = require("react-loaders").Loader;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      recommendedCourses : [],
      recommendedBooks : [],
      recommendedPlaylists : [],
    };
  }
  componentDidMount = () => {
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


    // get course reccs
    fetch(recommendationAPI+"/course", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then(res => {
      if (res.status === 4001) {
        this.setState({error: true});
      } else {
        res.json().then(resJson => {
          this.setState({recommendedCourses: resJson});
        });
      }
    });

    // fetch book recs

    fetch(recommendationAPI+"/book", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then(res => {
      if (res.status === 4001) {
        this.setState({error: true});
      } else {
        res.json().then(resJson => {
          this.setState({recommendedBooks: resJson});
        });
      }
    });

    // fetch playlist recs

    fetch(recommendationAPI+"/playlist", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then(res => {
      if (res.status === 4001) {
        this.setState({error: true});
      } else {
        res.json().then(resJson => {
          console.log(resJson);
          this.setState({recommendedPlaylists: resJson});
        });
      }
    });

  };
  render() {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";

    return (
      <React.Fragment>
        <center>
          <h3 className="bebas" style={{ marginTop: 100 }}>
            Welcome Home!
          </h3>
          <img
            src={this.state.user.picture}
            className="shadow"
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              backgroundColor: "white",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          />
          <h6>{this.state.user.email}</h6>
        </center>

        <Container>
          <SearchBar />
          <h3 className="bebas" style={{ marginTop: 60, fontSize: 40 }}>
            Favourite Books 📚
          </h3>
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
          <Row>
            {this.state.user.profileinfo &&
              this.state.user.profileinfo.favouriteBooks.map((item, index) =>
                renderBook(item)
              )}
          </Row>
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

          {/* recommendations */}

          {this.state.recommendedCourses.length > 0 && (
          <span>
            <h3 className="bebas" style={{ marginTop: 60, fontSize: 40 }}>
              Courses you may like!
            </h3>
            <Row>
              { this.state.recommendedCourses.map((item, index) => renderCourse(item) )}
            </Row>
          </span>
          )}

          {this.state.recommendedPlaylists.length > 0 && (
          <span>
            <h3 className="bebas" style={{ marginTop: 60, fontSize: 40 }}>
              Playlists you may like!
            </h3>
            <Row>
              { this.state.recommendedPlaylists.map((item, index) => renderPlaylist(item) )}
            </Row>
          </span>
          )}

          {this.state.recommendedBooks.length > 0 && (
          <span>
            <h3 className="bebas" style={{ marginTop: 60, fontSize: 40 }}>
              Books you may like!
            </h3>
            <Row>
              { this.state.recommendedBooks.map((item, index) => renderBook(item) )}
            </Row>
          </span>
          )}


        </Container>
      </React.Fragment>
    );
  }
}
