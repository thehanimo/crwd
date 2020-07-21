import React, { useState, useEffect, useRef } from "react";
import Cookie from "js-cookie";
import { backendAPI, booksAPI } from "../../../constants";
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

import { useParams } from "react-router-dom";
import ReactStarsRating from "react-awesome-stars-rating";
import { MessageSquare, Clock, User, CheckCircle } from "react-feather";
import "./Book.css";
var Loader = require("react-loaders").Loader;

export default function Book() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [bookData, setBookData] = useState({});
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const reviewTextArea = useRef(null);

  useEffect(() => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(booksAPI + "?id=" + id, {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 401) {
        setError(true);
      } else
        res.json().then((resJson) => {
          setBookData(resJson[0]);
        });
    });

    fetch(backendAPI + "/users", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      if (res.status === 401) {
        setError(true);
      } else
        res.json().then((resJson) => {
          setUsername(resJson.username);
        });
    });
  }, []);

  const submitReview = () => {
    let body = reviewTextArea.current.value.trim();
    if (body === "") return;
    setIsSubmitting(true);
    // fetch
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessAlert(true);
      setRating(0);
      reviewTextArea.current.value = "";
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    }, 3000);
  };

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
          open={showSuccessAlert}
        >
          <CheckCircle size={16} /> Thank you for your review! 🙂
        </Alert>

        <Row>
          <Col>
            <h3 className="bebas" style={{ marginTop: 60, fontSize: 40 }}>
              {bookData.title}
            </h3>
            <div>By {bookData.author}</div>
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
              {bookData.pub_date && bookData.pub_date.split("T")[0]}
            </div>
          </Col>
        </Row>

        <Row style={{ justifyContent: "flex-end" }}>
          <a href={bookData.link} target="_blank">
            <Button theme="warning">Buy on Amazon</Button>
          </a>
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
                height: 300,
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
              src={bookData.picture}
              style={{ minHeight: 300, width: 300 }}
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
              <CardBody onClick={() => reviewTextArea.current.focus()}>
                <h5 className="bebas" style={{ marginBottom: 5, fontSize: 24 }}>
                  {username}
                </h5>
                <ReactStarsRating
                  onChange={(rating) => {
                    this.setState({ rating });
                  }}
                  value={rating}
                  size={20}
                />
                <FormTextarea
                  innerRef={reviewTextArea}
                  style={{ marginTop: 20, marginBottom: 20 }}
                  placeholder="Write a review"
                  disabled={isSubmitting}
                />
                {!isSubmitting ? (
                  <Button onClick={submitReview}>Submit</Button>
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
                  <CardBody onClick={() => reviewTextArea.current.focus()}>
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
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
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
