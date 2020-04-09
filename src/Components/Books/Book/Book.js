import React from "react";
import Cookie from "js-cookie";
import { backendAPI } from "../../../constants";
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
} from "shards-react";
import ReactStarsRating from "react-awesome-stars-rating";
import { MessageSquare, Clock, User, CheckCircle } from "react-feather";
import "./Book.css";
var Loader = require("react-loaders").Loader;

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSuccessAlert: false,
      rating: 0,
    };
  }
  componentDidMount = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(backendAPI + "/users", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      if (res.status === 401) {
        this.setState({ error: true });
      } else
        res.json().then((resJson) => {
          this.setState({ username: resJson.username });
        });
    });
  };
  submitReview = () => {
    let body = this.reviewTextArea.value.trim();
    let { rating } = this.state;
    if (body === "") return;
    this.setState({ isSubmitting: true });
    // fetch
    setTimeout(() => {
      this.setState({ isSubmitting: false, showSuccessAlert: true, rating: 0 });
      this.reviewTextArea.value = "";
      setTimeout(() => {
        this.setState({ showSuccessAlert: false });
      }, 2000);
    }, 3000);
  };
  render() {
    return (
      <React.Fragment>
        <Container>
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
            <CheckCircle size={16} /> Thank you for your review! 🙂
          </Alert>

          <Row>
            <Col>
              <h3 className="bebas" style={{ marginTop: 60, fontSize: 40 }}>
                Kohiti's Anomaly
              </h3>
              <div>By Shounak Mondal</div>
              <div style={{ marginTop: 5 }}>
                <ReactStarsRating
                  onChange={() => {}}
                  value={1}
                  isEdit={false}
                  size={20}
                />
              </div>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Clock
                  color="#888"
                  size={16}
                  style={{ marginRight: 4, marginBottom: 3 }}
                />
                12 Jan 20'
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flex: 1,
                marginTop: 40,
                marginBottom: 40,
              }}
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
                <Loader type="line-scale" active color="#333" />
              </div>
              <img
                src={`https://picsum.photos/300/400`}
                style={{ height: 400, width: 300 }}
              />
            </Col>
          </Row>

          <Row>
            <Col
              style={{
                alignItems: "center",
                display: "flex",
                flex: 1,
                marginTop: 30,
              }}
            >
              <h3 className="bebas" style={{ marginTop: 20, fontSize: 32 }}>
                Share your review.
              </h3>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card
                style={{
                  maxWidth: "100%",
                  borderRadius: 5,
                  padding: 0,
                  overflow: "hidden",
                }}
                className="growOnHover"
              >
                <CardBody onClick={() => this.reviewTextArea.focus()}>
                  <h5
                    className="bebas"
                    style={{ marginBottom: 5, fontSize: 24 }}
                  >
                    {this.state.username}
                  </h5>
                  <ReactStarsRating
                    onChange={(rating) => {
                      this.setState({ rating });
                    }}
                    value={this.state.rating}
                    size={20}
                  />
                  <FormTextarea
                    innerRef={(ref) => (this.reviewTextArea = ref)}
                    style={{ marginTop: 20, marginBottom: 20 }}
                    placeholder="Write a review"
                    disabled={this.state.isSubmitting}
                  />
                  {!this.state.isSubmitting ? (
                    <Button onClick={this.submitReview}>Submit</Button>
                  ) : (
                    <div>
                      <Loader type="line-scale" active color="#333" />
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col
              style={{
                alignItems: "center",
                display: "flex",
                flex: 1,
                marginTop: 30,
              }}
            >
              <h3 className="bebas" style={{ marginTop: 20, fontSize: 32 }}>
                Here's what others have to say
              </h3>
            </Col>
          </Row>

          {["1", "2", "3", "4", "5", "1", "2", "3", "4", "5"].map(
            (item, index) => (
              <Row>
                <Col>
                  <Card
                    style={{
                      maxWidth: "100%",
                      borderRadius: 5,
                      padding: 0,
                      overflow: "hidden",
                    }}
                    className="growOnHover"
                  >
                    <CardBody onClick={() => this.reviewTextArea.focus()}>
                      <h5
                        className="bebas"
                        style={{ marginBottom: 5, fontSize: 24 }}
                      >
                        User{item}
                      </h5>
                      <ReactStarsRating
                        onChange={() => {}}
                        value={1}
                        isEdit={false}
                        size={20}
                      />
                      <div style={{ marginTop: 10 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </div>
                    </CardBody>
                    <CardFooter>
                      <div
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: 12,
                        }}
                      >
                        <Clock
                          color="#888"
                          size={12}
                          style={{ marginRight: 4, marginBottom: 3 }}
                        />
                        12 Jan 20'
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            )
          )}
        </Container>
      </React.Fragment>
    );
  }
}
