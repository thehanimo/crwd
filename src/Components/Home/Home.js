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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      recommendedCourses: [],
      recommendedBooks: [],
      recommendedPlaylists: [],
      suggestions: [],
      activeItemIndex: 0,
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

    // get course reccs
    fetch(recommendationAPI + "/course", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      if (res.status === 4001) {
        this.setState({ error: true });
      } else {
        res.json().then((resJson) => {
          this.setState({
            recommendedCourses: resJson,
            suggestions: [...this.state.suggestions, ...resJson],
          });
        });
      }
    });

    // fetch book recs

    fetch(recommendationAPI + "/book", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      if (res.status === 4001) {
        this.setState({ error: true });
      } else {
        res.json().then((resJson) => {
          this.setState({
            recommendedBooks: resJson,
            suggestions: [...this.state.suggestions, ...resJson],
          });
        });
      }
    });

    // fetch playlist recs

    fetch(recommendationAPI + "/playlist", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      if (res.status === 4001) {
        this.setState({ error: true });
      } else {
        res.json().then((resJson) => {
          console.log(resJson);
          this.setState({
            recommendedPlaylists: resJson,
            suggestions: [...this.state.suggestions, ...resJson],
          });
        });
      }
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
          <Row style={{ marginTop: 100 }}>
            {/* <h3>Hello, {this.state.user.username}!</h3>
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
            <h6>{this.state.user.email}</h6> */}
          </Row>
          <center>
            <img
              src={require("../../images/crwd-logo-full.svg")}
              style={{ height: 200 }}
            />
          </center>
          <Row style={{ position: "relative", zIndex: 2 }}>
            <SearchBar />
          </Row>

          {this.state.suggestions.length !== 0 && (
            <Row style={{ position: "relative" }}>
              <h3
                style={{
                  marginTop: 60,
                  fontSize: 30,
                  fontWeight: "bold",
                  fontFamily: "",
                }}
              >
                We think you might like these...
              </h3>
              <div style={{ width: "100%" }}>
                <ItemsCarousel
                  infiniteLoop
                  requestToChangeActive={(ind) =>
                    this.setState({ activeItemIndex: ind })
                  }
                  activeItemIndex={this.state.activeItemIndex}
                  numberOfCards={3}
                  gutter={20}
                  // leftChevron={<button>{"<"}</button>}
                  // rightChevron={<button>{">"}</button>}
                  // outsideChevron
                  // chevronWidth={chevronWidth}
                >
                  {this.state.suggestions
                    .sort((a, b) =>
                      parseFloat(a.rating) > parseFloat(b.rating) ? -1 : 1
                    )
                    .map((item, index) => {
                      if (item.type == "book") return renderBook(item);
                      if (item.type == "course") return renderCourse(item);
                      if (item.type == "playlist") return renderPlaylist(item);
                    })}
                </ItemsCarousel>
              </div>
            </Row>
          )}
          {/* {this.state.user.profileinfo &&
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
          </Row> */}
        </Container>
      </React.Fragment>
    );
  }
}
