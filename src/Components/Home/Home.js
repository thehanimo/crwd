import React from "react";
import Cookie from "js-cookie";
import { backendAPI } from "../../constants";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    fetch(backendAPI + "/users", {
      method: "GET",
      headers: {
        Authorization: JWT
      }
    }).then(res => {
      if (res.status === 401) {
        this.setState({ error: true });
      } else
        res.json().then(resJson => {
          this.setState({ email: resJson.email, picture: resJson.picture });
        });
    });
  };
  render() {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";

    return (
      <React.Fragment>
        <center>
          <h3 className="bebas" style={{ marginTop: 100 }}>
            Welcome Home!
          </h3>
          <img
            src={this.state.picture}
            className="shadow"
            style={{ height: 100, width: 100, borderRadius: 50 }}
          />
          <h6>{this.state.email}</h6>
        </center>
      </React.Fragment>
    );
  }
}
