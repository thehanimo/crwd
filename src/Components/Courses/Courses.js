import React from "react";
import Cookie from "js-cookie";
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
} from "shards-react";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactStarsRating from "react-awesome-stars-rating";
import { MessageSquare, Clock } from "react-feather";
import { Nav, NavItem, NavLink } from "shards-react";
import { backendAPI, coursesAPI } from "../../constants";
import "loaders.css/loaders.css";
import "./Courses.css";

var Loader = require("react-loaders").Loader;

export default class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      totalPages: 0,
      nextPage: 1,
    };
  }
  componentDidMount = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(coursesAPI, {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 401) {
        this.setState({ error: true });
      } else
        res.json().then((resJson) => {
          console.log(resJson);
          this.setState({
            courses: resJson,
            totalPages: resJson[0].totalpages,
            nextPage: 2,
          });
        });
    });
  };

  fetchData = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(coursesAPI + "?page=" + this.state.nextPage, {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      res.json().then((resJson) => {
        this.setState({
          courses: this.state.courses.concat(resJson),
          nextPage: this.state.nextPage + 1,
        });
      });
    });
  };
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <h3 className="bebas" style={{ marginTop: 60, fontSize: 40 }}>
                Courses we love! 👩🏽‍💻
              </h3>
            </Col>
          </Row>
          <InfiniteScroll
            dataLength={this.state.nextPage} //This is important field to render the next data
            next={this.fetchData}
            hasMore={this.state.nextPage <= this.state.totalPages}
            loader={
              <p style={{ textAlign: "center" }}>
                <b>Loading...</b>
              </p>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Row style={{ justifyContent: "center" }}>
              {this.state.courses.map((item, index) => (
                <NavLink
                  active
                  href={"/course/" + item.id}
                  style={{ margin: 0, padding: 0 }}
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
                      style={{ width: 300, backgroundColor: "#FBFBFB" }}
                    />
                    <CardBody>
                      <CardTitle>{item.title}</CardTitle>
                      <p>By {item.professor}</p>
                      {item.rating == 0 ? (
                        <p style={{ color: "#333" }}>No Ratings yet</p>
                      ) : (
                        <ReactStarsRating
                          onChange={() => {}}
                          value={item.rating}
                          isEdit={false}
                          className="transparent"
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
              ))}
            </Row>
          </InfiniteScroll>
        </Container>
      </React.Fragment>
    );
  }
}
