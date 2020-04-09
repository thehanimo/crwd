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
import ReactStarsRating from "react-awesome-stars-rating";
import { MessageSquare, Clock } from "react-feather";
import { Nav, NavItem, NavLink } from "shards-react";
import { backendAPI, booksAPI } from "../../constants";
import "loaders.css/loaders.css";
import "./Books.css";

var Loader = require("react-loaders").Loader;

export default class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          id: 1,
          title:
            "The Science of Sci-Fi: From Warp Speed to Interstellar Travel The Science of Sci-Fi: From Warp Speed",
          link:
            "https://www.amazon.com/Science-Sci-Fi-Speed-Interstellar-Travel/dp/B07ZPCVMHC/ref=sr_1_1?dchild=1&keywords=science&qid=1586362841&rnid=2941120011&s=books&sr=1-1",
          author: "Erin Macdonald",
          picture: "/media/bookpics/51KzeM5AigL.jpg",
          pub_date: "2020-04-08T16:36:40Z",
          json: {
            reviews: {},
            tags: {},
          },
        },
        {
          id: 2,
          title: "Understanding the Misconceptions of Science",
          link:
            "https://www.amazon.com/Understanding-the-Misconceptions-of-Science/dp/B07RZM99RN/ref=sr_1_2?dchild=1&keywords=science&qid=1586363991&refinements=p_n_feature_nine_browse-bin%3A3291437011&rnid=1000&s=books&sr=1-2",
          author: "Don Lincoln",
          picture: "/media/bookpics/51q2di1v6YL.jpg",
          pub_date: "2020-04-08T16:39:34Z",
          json: {
            reviews: {},
            tags: {},
          },
        },
        {
          id: 3,
          title:
            "Stochastics of Environmental and Financial Economics: Centre of Advanced Study, Oslo, Norway, 2014-2",
          link:
            "https://www.amazon.com/Stochastics-Environmental-Financial-Economics-Proceedings-ebook/dp/B078YH2RMK/ref=sr_1_3?dchild=1&keywords=science&qid=1586363991&refinements=p_n_feature_nine_browse-bin%3A3291437011&rnid=1000&s=books&sr=1-3",
          author: "Fred Espen Benth",
          picture: "/media/bookpics/41dKsNLg1XL._SX330_BO1204203200_.jpg",
          pub_date: "2020-04-08T16:41:00Z",
          json: {
            reviews: {},
            tags: {},
          },
        },
        {
          id: 4,
          title:
            "Earth Observation Open Science and Innovation (ISSI Scientific Report Series Book 15)",
          link:
            "https://www.amazon.com/Observation-Science-Innovation-Scientific-Report-ebook/dp/B0798GF3T6/ref=sr_1_4?dchild=1&keywords=science&qid=1586363991&refinements=p_n_feature_nine_browse-bin%3A3291437011&rnid=1000&s=books&sr=1-4",
          author: "Pierre-Philippe Mathieu",
          picture: "/media/bookpics/51bceph4t9L.jpg",
          pub_date: "2020-04-08T16:41:55Z",
          json: {
            reviews: {},
            tags: {},
          },
        },
        {
          id: 5,
          title: "Science Matters: Achieving Scientific Literacy",
          link:
            "https://www.amazon.com/Science-Matters-Achieving-Scientific-Literacy-ebook/dp/B002CFQ6WC/ref=sr_1_5?dchild=1&keywords=science&qid=1586363991&refinements=p_n_feature_nine_browse-bin%3A3291437011&rnid=1000&s=books&sr=1-5",
          author: "Robert",
          picture: "/media/bookpics/51kACbKRMJL._SX324_BO1204203200_.jpg",
          pub_date: "2020-04-08T16:43:29Z",
          json: {
            reviews: {},
            tags: {},
          },
        },
        {
          id: 6,
          title: "",
          link: "",
          author: "",
          picture: null,
          pub_date: "2020-04-09T10:16:34.074289Z",
          json: {
            tags: {},
            reviews: [
              {
                email: "abc@xyz",
                rating: "5",
                review: "abc",
              },
            ],
          },
        },
        {
          id: 7,
          title: "asd",
          link: "asd.com",
          author: "asd",
          picture: null,
          pub_date: "2020-04-09T10:31:38.367076Z",
          json: {
            tags: {},
            reviews: [],
          },
        },
      ],
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
          this.setState({ books1: resJson });
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
          <Row style={{ justifyContent: "center" }}>
            {this.state.books.map((item, index) => (
              <NavLink active href="/books/1" style={{ margin: 0, padding: 0 }}>
                <Card
                  style={{
                    maxWidth: "300px",
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                  className="growOnHover"
                >
                  <div
                    style={{
                      position: "absolute",
                      height: 200,
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
                    src={`https://picsum.photos/seed/${item.id}/300/200`}
                    style={{ height: 200, width: 300 }}
                  />
                  <CardBody>
                    <CardTitle>{item.title}</CardTitle>
                    <p>By {item.author}</p>
                    <ReactStarsRating
                      onChange={() => {}}
                      value={4}
                      isEdit={false}
                    />
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
                        style={{ marginRight: 4 }}
                      />
                      {item.pub_date.split("T")[0]}
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
                      {item.json.reviews.length} reviews
                    </div>
                  </CardFooter>
                </Card>
              </NavLink>
            ))}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
