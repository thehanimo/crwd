import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
import InfiniteScroll from "react-infinite-scroll-component";
import Rating from "react-rating";
import { MessageSquare, Clock } from "react-feather";
import "loaders.css/loaders.css";
import SearchBar from "./SearchBar";
import { searchAPI } from "../../constants";
import { renderBook, renderCourse, renderPlaylist } from "../Global/Global";

var Loader = require("react-loaders").Loader;

export default function Search() {
  const [data, setData] = useState([]);
  const { term } = useParams();

  useEffect(() => {
    fetch(searchAPI + `?q=${term}`).then((res) =>
      res.json().then((resJson) => {
        setData(resJson);
      })
    );
  }, []);

  return (
    <>
      <Container>
        <Row style={{ position: "relative", zIndex: 1000 }}>
          <SearchBar term={term} />
        </Row>
        <Row>
          <Col>
            <h3 className="bebas" style={{ marginTop: 20, fontSize: 40 }}>
              Search Results for "{term}":
            </h3>
          </Col>
        </Row>
        <Row style={{ position: "relative", zIndex: -1 }}>
          {data.map((item) => {
            if (item.type == "book") return renderBook(item);
            else if (item.type == "course") return renderCourse(item);
            else if (item.type == "playlist") return renderPlaylist(item);
          })}
        </Row>
      </Container>
    </>
  );
}
