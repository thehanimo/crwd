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
} from "shards-react";
import { MessageSquare, Clock, CheckCircle} from "react-feather";
import { Nav, NavItem, NavLink } from "shards-react";
import { backendAPI, discussionAPI } from "../../constants";
import { withRouter } from "react-router-dom";
import { Moment } from "react-moment";


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
    };
    this.submitComment = this.submitComment.bind(this);
    this.getTextArea = this.getTextArea.bind(this);

  }
  componentDidMount = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    console.log(JWT);

    const id = this.props.match.params.id;
    const type = this.props.match.params.type

    this.state.endpoint =  discussionAPI + "/" + type + "/" + id;

    fetch(this.state.endpoint, {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then( async res => {
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
  };


  submitComment = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(this.state.endpoint, {
      method: "POST",
      headers: { 
        Authorization: JWT,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({comment: this.state.userInput})
    }).then(res => res.json())
      .then(res => {
        this.setState({posts: [...this.state.posts, res]});
        this.setState({userInput: "", showSuccessAlert: true});
        setTimeout(() => {
          this.setState({showSuccessAlert: false});
        }, 2000)
      });
  };

  getTextArea = (event) => {
    console.log(event.target.value);
    this.setState({userInput: event.target.value});
  }


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
          <CheckCircle size={16} /> Thank you for your comment! 🙂
        </Alert>
          <Row>
            <Col>
              <h3 className="topic" style={{ marginTop: 60, fontSize: 30 }}>
                discussion: {this.state.topic}
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>
                Post a comment!
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
                <CardBody>
                  <FormTextarea
                    // style={{ marginTop: 20, marginBottom: 20 }}
                    placeholder="Write a comment"
                    // disabled={isSubmitting}
                    onChange={this.getTextArea}
                    value={this.state.userInput}
                  />
                  <br />
                  {!this.state.isSubmitting ? (
                    <Button onClick={this.submitComment}>
                      Submit
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
          {this.state.posts.slice().reverse().map((item, index) =>  { console.log(item.date_written); return(
            <Row key={index}>
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
                    <div style={{ marginTop: 10 }}>{item.comment}</div>
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
                      {/* < Moment fromNow>{item.date_written} /></Moment> */}
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          )})}
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(Discussions);
