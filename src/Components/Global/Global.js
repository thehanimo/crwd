import React from "react";

import {
  Card,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  NavLink,
} from "shards-react";
import Moment from "react-moment";
import Rating from "react-rating";
import { MessageSquare, Clock } from "react-feather";
import "loaders.css/loaders.css";
var Loader = require("react-loaders").Loader;

export const renderBook = (item) => (
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
        backgroundImage: "linear-gradient(#fff, #fbfbfb, #ffeac1)",
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
      <CardImg src={item.picture} style={{ width: 300, minHeight: 186 * 2 }} />
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
          <MessageSquare color="#888" size={16} style={{ marginRight: 4 }} />
          {item.bookinfo.reviews.length} reviews
        </div>
      </CardFooter>
    </Card>
  </NavLink>
);

export const renderCourse = (item) => (
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
        backgroundImage: "linear-gradient(#fff, #fbfbfb, #e5fbff)",
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
          <MessageSquare color="#888" size={16} style={{ marginRight: 4 }} />
          {item.courseinfo.reviews.length} reviews
        </div>
      </CardFooter>
    </Card>
  </NavLink>
);

export const renderPlaylist = (item) => (
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
          <MessageSquare color="#888" size={16} style={{ marginRight: 4 }} />
          {item.playlistinfo.reviews.length} reviews
        </div>
      </CardFooter>
    </Card>
  </NavLink>
);
