import React, { useState, useEffect, useRef } from "react";
import Cookie from "js-cookie";
import { backendAPI, coursesAPI, dicussionAPI } from "../../../constants";
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

import Moment from "react-moment";

import { useParams } from "react-router-dom";
import ReactStarsRating from "react-awesome-stars-rating";
import { MessageSquare, Clock, User, CheckCircle } from "react-feather";
import "./Course.css";
var Loader = require("react-loaders").Loader;

export default function Course() {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [courseData, setCourseData] = useState({});
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selfReview, setSelfReview] = useState(null);
  const [isSelfReviewChanged, setIsSelfReviewChanged] = useState(false);
  const { id } = useParams();
  const reviewTextArea = useRef(null);
  const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";

  useEffect(async () => {
    console.log("asd");
    let username, reviews, res, resJson;
    res = await fetch(coursesAPI + "?id=" + id, {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    });
    if (res.status === 401) {
      setError(true);
    } else {
      resJson = await res.json();
      setCourseData(resJson);
      setReviews(resJson.courseinfo.reviews);
      reviews = resJson.courseinfo.reviews;
    }

    res = await fetch(backendAPI + "/users", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    });
    if (res.status === 401) {
      setError(true);
    } else {
      resJson = await res.json();
      setUsername(resJson.username);
      username = resJson.username;
    }

    console.log(reviews, username);

    for (let i = 0; i < reviews.length; i++) {
      if (reviews[i].username === username) {
        setSelfReview(reviews[i]);
        setRating(reviews[i].rating);
        reviewTextArea.current.value = reviews[i].review;
        break;
      }
    }
  }, []);

  const submitReview = () => {
    let review = reviewTextArea.current.value.trim();
    if (rating == 0) return;
    setIsSubmitting(true);
    // fetch
    fetch(coursesAPI + `/${id}/review`, {
      method: "POST",
      headers: {
        Authorization: JWT,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating,
        review,
      }),
    }).then(async (res) => {
      if (res.status === 401) {
        setError(true);
      } else {
        let resJson = await res.json();
        setIsSubmitting(false);
        setShowSuccessAlert(true);
        setRating(0);
        setCourseData({ ...courseData, rating: resJson.rating });
        reviewTextArea.current.value = "";
        updateReviews();
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 2000);
      }
    });
  };

  const updateReviews = () => {
    fetch(coursesAPI + `/${id}/reviews`, {
      method: "GET",
    }).then((res) => {
      if (res.status === 500) {
        setError(true);
      } else
        res.json().then((reviews) => {
          setReviews(reviews);
          for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].username === username) {
              setSelfReview(reviews[i]);
              setRating(reviews[i].rating);
              setIsSelfReviewChanged(false);
              reviewTextArea.current.value = reviews[i].review;
              break;
            }
          }
        });
    });
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
              {courseData.title}
            </h3>
            <div>By {courseData.professor}</div>
            <div style={{ marginTop: 5 }}>
              {courseData.rating == 0 ? (
                <p>No ratings yet</p>
              ) : (
                <ReactStarsRating
                  value={courseData.rating}
                  isEdit={false}
                  size={20}
                />
              )}
            </div>
            {/* <div
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
              <Moment format="DD MMM 'YY">{courseData.pub_date}</Moment>
            </div> */}
          </Col>
        </Row>

        <Row style={{ justifyContent: "flex-end" }}>
          <a href={courseData.link} target="_blank">
            <Button theme="info">Visit website</Button>
          </a>
        </Row>
        <br />
        <Row style={{ justifyContent: "flex-end" }}>
          <a href={"/discussion/course/"+id} target="_blank">
            <Button theme="info">Discuss</Button>
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
              src={courseData.picture}
              style={{ minHeight: 300, width: 300, backgroundColor: "#FBFBFB" }}
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
              {selfReview ? "Your Review" : "Share your review"}
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
                    setRating(rating);
                  }}
                  value={rating}
                  size={20}
                />
                <FormTextarea
                  innerRef={reviewTextArea}
                  style={{ marginTop: 20, marginBottom: 20 }}
                  placeholder="Write a review"
                  disabled={isSubmitting}
                  onChange={(text) => {
                    if (selfReview) {
                      if (
                        selfReview.review == reviewTextArea.current.value.trim()
                      )
                        setIsSelfReviewChanged(false);
                      else setIsSelfReviewChanged(true);
                    }
                  }}
                />
                {!isSubmitting ? (
                  <Button
                    onClick={submitReview}
                    disabled={
                      selfReview
                        ? selfReview.rating == rating && !isSelfReviewChanged
                        : rating === 0
                    }
                  >
                    {selfReview ? "Edit" : "Submit"}
                  </Button>
                ) : (
                  <div>
                    <Loader type="line-scale" active color="#333" />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        {reviews.length !== 0 && (
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
        )}

        {reviews.map((item, index) => (
          <Row>
            <Col>
              <Card
                style={{
                  maxWidth: "100%",
                  borderRadius: 5,
                  padding: 0,
                  overflow: "hidden",
                  margin: 30,
                }}
              >
                <CardBody>
                  <h5
                    className="bebas"
                    style={{ marginBottom: 5, fontSize: 24 }}
                  >
                    {item.username}
                  </h5>
                  <ReactStarsRating
                    onChange={() => {}}
                    value={item.rating}
                    isEdit={false}
                    size={20}
                  />
                  <div style={{ marginTop: 10 }}>{item.review}</div>
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
                    <Moment fromNow date={item.date_written}></Moment>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </React.Fragment>
  );
}
