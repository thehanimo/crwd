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
import Moment from "react-moment";
import InfiniteScroll from "react-infinite-scroll-component";
import Rating from "react-rating";
import { MessageSquare, Clock } from "react-feather";
import { backendAPI, playlistsAPI } from "../../constants";
import "loaders.css/loaders.css";
import "./Playlists.css";
import { renderPlaylist } from "../Global/Global";

var Loader = require("react-loaders").Loader;

export default class Playlists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [
        {
          id: 1,
          title: "Mastering the Brand New SwiftUI",
          author: "HaniMohammed886HaniMohammed886",
          pub_date: new Date(Date.now()).toISOString(),
          rating: 0,
          playlistinfo: {
            tags: ["Tech"],
            reviews: [],
            description:
              "This playlist helps you master the newly released SwiftUI.",
            links: [],
          },
        },
      ],
      totalPages: 10,
      nextPage: 1,
    };
  }
  componentDidMount = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(playlistsAPI, {
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
          this.setState({
            playlists: resJson,
            totalPages: resJson.length === 0 ? 0 : resJson[0].totalpages,
            nextPage: 2,
          });
        });
    });
  };

  fetchData = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(playlistsAPI + "?page=" + this.state.nextPage, {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      res.json().then((resJson) => {
        this.setState({
          playlists: this.state.playlists.concat(resJson),
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
                Playlists we love! 🗒
              </h3>
            </Col>
            <Col>
              <Button
                outline
                theme="success"
                style={{ marginTop: 60, float: "right" }}
                href="/playlist/create"
              >
                Create a Playlist
              </Button>
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
              {this.state.playlists.map((item, index) => renderPlaylist(item))}
            </Row>
          </InfiniteScroll>
        </Container>
      </React.Fragment>
    );
  }
}
