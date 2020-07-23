import React from "react";
import Cookie from "js-cookie";
import { backendAPI } from "../../constants";
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
var Loader = require("react-loaders").Loader;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
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
              this.state.user.profileinfo.favouriteBooks.map((item, index) => (
                <NavLink
                  active
                  href={"/book/" + item.id}
                  style={{ margin: 0, padding: 0, color: "#333" }}
                >
                  <Card
                    style={{
                      maxWidth: "300px",
                      borderRadius: 20,
                      overflow: "hidden",
                      backgroundImage:
                        "linear-gradient(#fff, #fbfbfb, #ffeac1)",
                    }}
                    className="growOnHover"
                  >
                    <div
                      style={{
                        position: "absolute",
                        height: 400,
                        width: 300,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: -1,
                      }}
                    >
                      <Loader type="ball-pulse" active color="#333" />
                    </div>
                    <CardImg
                      src={item.picture}
                      style={{ width: 300, minHeight: 186 * 2 }}
                    />
                    <CardBody>
                      <CardTitle>{item.title}</CardTitle>
                      <p>By {item.author}</p>
                      {item.rating == 0 ? (
                        <p style={{ color: "#333" }}>No Ratings yet</p>
                      ) : (
                        <Rating
                          emptySymbol="fa fa-star fa-2x emptyStar"
                          fullSymbol="fa fa-star fa-2x fullStar"
                          fractions={2}
                          initialRating={item.rating}
                          readonly
                        />
                      )}{" "}
                    </CardBody>
                    <CardFooter>
                      <div
                        style={{
                          fontSize: 12,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Clock
                          color="#888"
                          size={16}
                          style={{ marginRight: 4, marginTop: -3 }}
                        />
                        {item.pub_date.split("-")[0]}
                        <span
                          style={{
                            marginLeft: 20,
                          }}
                        />
                        <MessageSquare
                          color="#888"
                          size={16}
                          style={{ marginRight: 4 }}
                        />
                        {item.bookinfo.reviews.length} reviews
                      </div>
                    </CardFooter>
                  </Card>
                </NavLink>
              ))}
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
              this.state.user.profileinfo.favouriteCourses.map(
                (item, index) => (
                  <NavLink
                    active
                    href={"/course/" + item.id}
                    style={{ margin: 0, padding: 0, color: "#333" }}
                  >
                    <Card
                      style={{
                        maxWidth: "300px",
                        borderRadius: 20,
                        overflow: "hidden",
                        backgroundImage:
                          "linear-gradient(#fff, #fbfbfb, #e5fbff)",
                      }}
                      className="growOnHover"
                    >
                      <div
                        style={{
                          position: "absolute",
                          width: 300,
                          height: 300,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: -1,
                        }}
                      >
                        <Loader type="ball-pulse" active color="#333" />
                      </div>
                      <CardImg
                        src={item.picture}
                        style={{
                          width: 300,
                          minHeight: 300,
                          backgroundColor: "#FBFBFB",
                        }}
                      />
                      <CardBody>
                        <CardTitle>{item.title}</CardTitle>
                        <p>By {item.professor}</p>
                        {item.rating == 0 ? (
                          <p style={{ color: "#333" }}>No Ratings yet</p>
                        ) : (
                          <Rating
                            emptySymbol="fa fa-star fa-2x emptyStar"
                            fullSymbol="fa fa-star fa-2x fullStar"
                            fractions={2}
                            initialRating={item.rating}
                            readonly
                          />
                        )}{" "}
                      </CardBody>
                      <CardFooter>
                        <div
                          style={{
                            fontSize: 12,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {/* <Clock
                          color="#888"
                          size={16}
                          style={{ marginRight: 4 }}
                        />
                        {item.pub_date.split("T")[0]}
                        <span
                          style={{
                            marginLeft: 20,
                          }}
                        /> */}
                          <MessageSquare
                            color="#888"
                            size={16}
                            style={{ marginRight: 4 }}
                          />
                          {item.courseinfo.reviews.length} reviews
                        </div>
                      </CardFooter>
                    </Card>
                  </NavLink>
                )
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
                (item, index) => (
                  <NavLink
                    active
                    href={"/playlist/" + item.id}
                    style={{ margin: 0, padding: 0, color: "#333" }}
                  >
                    <Card
                      style={{
                        maxWidth: "300px",
                        borderRadius: 20,
                        overflow: "hidden",
                        backgroundImage: "linear-gradient(#fff, #eee)",
                      }}
                      className="growOnHover"
                    >
                      <CardBody>
                        <CardTitle>{item.title}</CardTitle>
                        {item.rating == 0 ? (
                          <p style={{ color: "#333" }}>No Ratings yet</p>
                        ) : (
                          <>
                            <Rating
                              emptySymbol="fa fa-star fa-2x emptyStar"
                              fullSymbol="fa fa-star fa-2x fullStar"
                              fractions={2}
                              initialRating={item.rating}
                              readonly
                            />
                            <div style={{ marginBottom: 27 }} />
                          </>
                        )}
                        <div
                          style={{
                            color: "#333",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={item.user_picture}
                            style={{
                              height: 50,
                              minWidth: 50,
                              borderRadius: 40,
                              marginRight: 12,
                              backgroundColor: "white",
                              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                          <div
                            style={{
                              wordWrap: "break-word",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.username}
                          </div>
                        </div>
                      </CardBody>
                      <CardFooter>
                        <div
                          style={{
                            fontSize: 12,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Clock
                            color="#888"
                            size={16}
                            style={{ marginRight: 4, marginTop: -3 }}
                          />
                          <Moment format="DD MMM 'YY">{item.pub_date}</Moment>
                          <span
                            style={{
                              marginLeft: 20,
                            }}
                          />
                          <MessageSquare
                            color="#888"
                            size={16}
                            style={{ marginRight: 4 }}
                          />
                          {item.playlistinfo.reviews.length} reviews
                        </div>
                      </CardFooter>
                    </Card>
                  </NavLink>
                )
              )}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
