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
  FormTextarea,
  Alert,
  FormInput,
} from "shards-react";
import { MessageSquare, Clock, CheckCircle, Send } from "react-feather";
import { Nav, NavItem, NavLink } from "shards-react";
import { backendAPI, discussionAPI } from "../../constants";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import smoothscroll from "smoothscroll-polyfill";

// kick off the polyfill!
smoothscroll.polyfill();

var Loader = require("react-loaders").Loader;

class Discussions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      topic: "",
      isSubmitting: false,
      userInput: "",
      showSuccessAlert: false,
      username: "",
    };
    this.submitComment = this.submitComment.bind(this);
    this.getTextArea = this.getTextArea.bind(this);
  }
  componentDidMount = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    console.log(JWT);

    const id = this.props.match.params.id;
    const type = this.props.match.params.type;

    this.state.endpoint = discussionAPI + "/" + type + "/" + id;

    fetch(this.state.endpoint, {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then(async (res) => {
      console.log(res);
      if (res.status === 401) {
        this.setState({ error: true });
      } else {
        let jsonRes = await res.json();
        console.log(jsonRes);
        this.setState({
          posts: jsonRes.posts,
          topic: jsonRes.topic,
        });
        console.log(this.state);
      }
    });

    fetch(backendAPI + "/users", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then(async (res) => {
      if (res.status === 401) {
      } else {
        let resJson = await res.json();
        this.setState({ username: resJson.username });
      }
    });
  };

  submitComment = () => {
    if (this.state.userInput.trim() == "") return;
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(this.state.endpoint, {
      method: "POST",
      headers: {
        Authorization: JWT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: this.state.userInput }),
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ posts: [...this.state.posts, res] });
        this.setState({ userInput: "", showSuccessAlert: true });
        window.scrollTo({
          top: document.body.scrollHeight,
          left: 0,
          behavior: "smooth",
        });
        setTimeout(() => {
          this.setState({ showSuccessAlert: false });
        }, 2000);
      });
  };

  getTextArea = (event) => {
    console.log(event.target.value);
    this.setState({ userInput: event.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <Container style={{ paddingBottom: 200 }}>
          <Alert
            theme="success"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 2,
            }}
            className="mb3"
            open={this.state.showSuccessAlert}
          >
            <CheckCircle size={16} /> Thank you for your comment! 🙂
          </Alert>
          <Row>
            <Col>
              <h3 className="topic" style={{ marginTop: 60, fontSize: 30 }}>
                <span style={{ fontWeight: "lighter", fontSize: 24 }}>
                  Discussion:{" "}
                </span>
                <b>{this.state.topic}</b>
              </h3>
            </Col>
          </Row>
          {this.state.posts.map((item, index) => {
            console.log(item.date_written);
            return (
              <Row key={index}>
                <Col>
                  <Card
                    style={{
                      maxWidth: "100%",
                      borderRadius: 5,
                      padding: 0,
                      overflow: "hidden",
                      margin: 30,
                      marginBottom: 10,
                      borderRadius:
                        item.username === this.state.username
                          ? "20px 20px 5px 20px"
                          : "20px 20px 20px 5px",
                    }}
                  >
                    <CardBody style={{ paddingTop: 16, paddingBottom: 16 }}>
                      <div>{item.comment}</div>
                    </CardBody>
                  </Card>
                  <div
                    style={{
                      marginBottom: 5,
                      fontSize: 16,
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                      display: "flex",
                      float:
                        item.username === this.state.username
                          ? "right"
                          : "left",
                    }}
                  >
                    <img
                      src={item.user_picture}
                      style={{
                        height: 30,
                        minWidth: 30,
                        borderRadius: 40,
                        marginRight: 12,
                        backgroundColor: "white",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                        }}
                      >
                        {item.username}
                      </div>
                      <div
                        style={{
                          fontSize: 9,
                          fontFamily: "Poppins",
                          fontWeight: "lighter",
                        }}
                      >
                        <Moment fromNow date={item.date_written}></Moment>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            );
          })}
        </Container>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            width: "100vw",
            backgroundColor: "#EEE",
            padding: "20px 0",
          }}
        >
          <Container>
            <Row>
              <Col style={{ display: "flex" }}>
                <FormTextarea
                  style={{
                    paddingRight: 100,
                    borderRadius: 20,
                    resize: "none",
                  }}
                  placeholder="Write a comment"
                  // disabled={isSubmitting}
                  onChange={this.getTextArea}
                  value={this.state.userInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") this.submitComment();
                  }}
                />
                <div
                  style={{
                    float: "right",
                    position: "absolute",
                    right: 25,
                    top: 10,
                  }}
                >
                  <Button
                    style={{ borderRadius: 100, padding: 10 }}
                    onClick={this.submitComment}
                    disabled={this.state.isSubmitting}
                  >
                    <Send size={20} />
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Discussions);
