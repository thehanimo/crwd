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
  Nav,
  NavItem,
  NavLink,
} from "shards-react";
import InfiniteScroll from "react-infinite-scroll-component";
import Rating from "react-rating";
import { MessageSquare, Clock } from "react-feather";
import { backendAPI, booksAPI } from "../../constants";
import "loaders.css/loaders.css";
import "./Books.css";
import { renderBook } from "../Global/Global";

var Loader = require("react-loaders").Loader;

export default class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      totalPages: 10,
      nextPage: 1,
    };
  }
  componentDidMount = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(booksAPI, {
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
            books: resJson,
            totalPages: resJson.length === 0 ? 0 : resJson[0].totalpages,
            nextPage: 2,
          });
        });
    });
  };

  fetchData = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(booksAPI + "?page=" + this.state.nextPage, {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      res.json().then((resJson) => {
        this.setState({
          books: this.state.books.concat(resJson),
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
                Books we love! 📚
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
              {this.state.books.map((item, index) => renderBook(item))}
            </Row>
          </InfiniteScroll>
        </Container>
      </React.Fragment>
    );
  }
}
