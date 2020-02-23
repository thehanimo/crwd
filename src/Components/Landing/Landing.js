import React from "react";
import { Button } from "shards-react";
import {
  Nav,
  NavItem,
  NavLink,
  Form,
  FormInput,
  FormGroup
} from "shards-react";
import GoogleLogo from "../../images/google.png";
import LinkedinLogo from "../../images/linkedin.png";
import "./Landing.css";
import posed, { PoseGroup } from "react-pose";
const UBox = posed.div({
  exit: {
    marginLeft: -16,
    marginRight: 16,
    opacity: 0
  },
  enter: {
    marginLeft: 0,
    marginRight: 0,
    opacity: 1
  }
});

const PBox = posed.div({
  exit: {
    marginLeft: 16,
    marginRight: -16,
    opacity: 0
  },
  enter: {
    marginLeft: 0,
    marginRight: 0,
    opacity: 1
  }
});

const Box = posed.div({
  exit: {
    opacity: 0
  },
  enter: {
    opacity: 1
  }
});

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUsername: true,
      showPassword: false,
      showLogin: true,
      showSignup: false
    };
  }
  render() {
    return (
      <div className="container-fluid bg">
        <div className="container">
          <div className="row">
            <div
              className="shadow col-lg-4 col-md-6 col-sm-8 col-10 mx-auto"
              style={{
                marginTop: 60,
                transition: "0.3s",
                height: this.state.showLogin ? 370 : 516
              }}
            >
              <div
                style={{
                  marginTop: 30,
                  marginBottom: 16,
                  paddingBottom: 20
                }}
              >
                <PoseGroup>
                  {this.state.showLogin && (
                    <Box key="loginForm">
                      <LoginForm
                        showSignup={() => {
                          this.setState({ showLogin: false });
                          setTimeout(() => {
                            this.setState({ showSignup: true });
                          }, 300);
                        }}
                      />
                    </Box>
                  )}

                  {this.state.showSignup && (
                    <Box key="signinForm">
                      <SignUpForm
                        showLogin={() => {
                          this.setState({ showSignup: false });
                          setTimeout(() => {
                            this.setState({
                              showLogin: true,
                              showPassword: false,
                              showUsername: true
                            });
                          }, 300);
                        }}
                      />
                    </Box>
                  )}
                </PoseGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUsername: true,
      showPassword: false
    };
  }
  render() {
    return (
      <React.Fragment>
        <h3 className="bebas" style={{ marginBottom: 20 }}>
          Log in
        </h3>
        <div style={{ minHeight: 117 }}>
          <PoseGroup>
            {this.state.showUsername && (
              <UBox key="usernameForm">
                <UsernameForm
                  onSuccess={() => {
                    this.setState({
                      showUsername: false
                    });
                    setTimeout(() => {
                      this.setState({
                        showPassword: true
                      });
                    }, 300);
                  }}
                />
              </UBox>
            )}
            {this.state.showPassword && (
              <PBox key="passwordForm">
                <PasswordForm
                  onBack={() => {
                    this.setState({
                      showPassword: false
                    });
                    setTimeout(() => {
                      this.setState({
                        showUsername: true
                      });
                    }, 300);
                  }}
                />
              </PBox>
            )}
          </PoseGroup>
        </div>

        <center>
          <h4 className="bebas">Or</h4>
        </center>
        <div>
          <div
            className="row"
            style={{
              justifyContent: "center"
            }}
          >
            <div className="google-round">
              <img src={GoogleLogo} className="small-logo" />
            </div>
            <div className="linkedin-round">
              <img src={LinkedinLogo} className="small-logo" />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 14 }}>
          Don't have an account yet?{" "}
          <a
            href="#"
            onClick={() => {
              this.props.showSignup();
            }}
          >
            Sign Up!
          </a>
        </div>
      </React.Fragment>
    );
  }
}

class UsernameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Form>
          <FormGroup>
            <FormInput id="#username" placeholder="Username" />
          </FormGroup>
        </Form>
        <Button
          onClick={() => {
            this.props.onSuccess();
          }}
        >
          Next
        </Button>
      </React.Fragment>
    );
  }
}

class PasswordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Form>
          <FormGroup>
            <FormInput type="password" id="#password" placeholder="Password" />
          </FormGroup>
        </Form>
        <Button
          theme="light"
          style={{ marginRight: 10 }}
          onClick={() => {
            this.props.onBack();
          }}
        >
          Back
        </Button>
        <Button>Go</Button>
      </React.Fragment>
    );
  }
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <h3 className="bebas" style={{ marginBottom: 20 }}>
          Sign up
        </h3>
        <FormGroup>
          <FormInput id="#username" placeholder="Name" />
        </FormGroup>
        <FormGroup>
          <FormInput id="#username" placeholder="Email" />
        </FormGroup>
        <FormGroup>
          <FormInput type="password" id="#password" placeholder="Password" />
        </FormGroup>
        <FormGroup>
          <FormInput
            type="password"
            id="#password"
            placeholder="Confirm Password"
          />
        </FormGroup>
        <Button>Go</Button>
        <center>
          <h4 className="bebas">Or</h4>
        </center>
        <div>
          <div
            className="row"
            style={{
              justifyContent: "center"
            }}
          >
            <div className="google-round">
              <img src={GoogleLogo} className="small-logo" />
            </div>
            <div className="linkedin-round">
              <img src={LinkedinLogo} className="small-logo" />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 14 }}>
          Have an account already?{" "}
          <a
            href="#"
            onClick={() => {
              this.props.showLogin();
            }}
          >
            Log in!
          </a>
        </div>
      </React.Fragment>
    );
  }
}
