import React from "react";
import { Button } from "shards-react";
import {
  Nav,
  NavItem,
  NavLink,
  Form,
  FormInput,
  FormGroup,
} from "shards-react";
import GoogleLogin from "react-google-login";
import { LinkedIn } from "react-linkedin-login-oauth2";

import GoogleLogo from "../../images/google.png";
import LinkedinLogo from "../../images/linkedin.png";
import "./Login.css";
import posed, { PoseGroup } from "react-pose";
import { backendAPI } from "../../constants";
import Cookie from "js-cookie";

const UBox = posed.div({
  exit: {
    marginLeft: -16,
    marginRight: 16,
    opacity: 0,
  },
  enter: {
    marginLeft: 0,
    marginRight: 0,
    opacity: 1,
  },
});

const PBox = posed.div({
  exit: {
    marginLeft: 16,
    marginRight: -16,
    opacity: 0,
  },
  enter: {
    marginLeft: 0,
    marginRight: 0,
    opacity: 1,
  },
});

const Box = posed.div({
  exit: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
});

const responseGoogle = (response) => {
  fetch(backendAPI + "/auth/google", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tokenId: response.tokenId }),
  })
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson.JWT);
      Cookie.set("JWT", resJson.JWT);
      window.location.replace("/home");
    });
};

const responseLinkedInSuccess = (response) => {
  fetch(backendAPI + "/auth/linkedin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(response),
  })
    .then((res) => res.json())
    .then((resJson) => {
      console.log(resJson.JWT);
      Cookie.set("JWT", resJson.JWT);
      window.location.replace("/home");
    });
};

const responseLinkedInFailure = (response) => {
  console.log(response);
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUsername: true,
      showPassword: false,
      showLogin: true,
      showSignup: false,
    };
  }
  render() {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    if (JWT != "null") {
      window.location.replace("/home");
    }
    return (
      <div className="container-fluid bg">
        <div className="container">
          <div className="row">
            <div
              className="shadow col-lg-4 col-md-6 col-sm-8 col-10 mx-auto"
              style={{
                marginTop: 60,
                transition: "0.3s",
                height: this.state.showLogin ? 370 : 516,
              }}
            >
              <div
                style={{
                  marginTop: 30,
                  marginBottom: 16,
                  paddingBottom: 20,
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
                              showUsername: true,
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
      showPassword: false,
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
                  username={this.state.username}
                  onSuccess={(username) => {
                    this.setState({
                      showUsername: false,
                      username,
                    });
                    setTimeout(() => {
                      this.setState({
                        showPassword: true,
                      });
                    }, 300);
                  }}
                />
              </UBox>
            )}
            {this.state.showPassword && (
              <PBox key="passwordForm">
                <PasswordForm
                  username={this.state.username}
                  onBack={() => {
                    this.setState({
                      showPassword: false,
                    });
                    setTimeout(() => {
                      this.setState({
                        showUsername: true,
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

        <OAuthButtons />

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

class OAuthButtons extends React.Component {
  render() {
    return (
      <div>
        <div
          className="row"
          style={{
            justifyContent: "center",
          }}
        >
          <GoogleLogin
            clientId="40651276287-8bgrmsj533aa383aefdebcdk1ad423oh.apps.googleusercontent.com"
            render={(renderProps) => (
              <div className="google-round" onClick={renderProps.onClick}>
                <img src={GoogleLogo} className="small-logo" />
              </div>
            )}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />

          <LinkedIn
            clientId="81jojxryre3jo3"
            onFailure={responseLinkedInFailure}
            onSuccess={responseLinkedInSuccess}
            scope="r_liteprofile r_emailaddress w_member_social"
            redirectUri={`${window.location.origin}/linkedin`}
            renderElement={({ onClick, disabled }) => (
              <div className="linkedin-round" onClick={onClick}>
                <img src={LinkedinLogo} className="small-logo" />
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

class UsernameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
  }

  componentDidMount = () => {
    if (this.props.username) this.onUsernameChange(this.props.username);
  };

  onUsernameChange = (text) => {
    if (text.length > 3 && /^[a-zA-Z0-9]+$/.test(text)) {
      fetch(backendAPI + `/users/username?username=${text}`)
        .then((res) => res.json())
        .then((resJson) => {
          this.setState({
            usernameValid: !resJson.isAvailable,
            username: text,
            error: false,
          });
        });
    } else {
      this.setState({ usernameValid: false, username: text, error: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Form>
          <FormGroup>
            <FormInput
              ref="username"
              id="#username"
              placeholder="Username"
              onChange={(e) => this.onUsernameChange(e.target.value)}
              usernameValid={this.state.usernameValid}
              value={this.state.username}
              invalid={this.state.error}
            />
          </FormGroup>
        </Form>
        <Button
          onClick={() => {
            if (this.state.usernameValid)
              this.props.onSuccess(this.state.username);
            else this.setState({ error: true });
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

  onPasswordChange = (text) => this.setState({ password: text, error: false });

  onSubmit = () => {
    const { password } = this.state;
    fetch(backendAPI + "/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: this.props.username, password }),
    }).then((res) => {
      if (res.status === 401) {
        this.setState({ error: true });
      } else
        res.json().then((resJson) => {
          console.log(resJson);
          Cookie.set("JWT", resJson.JWT);
          window.location.replace("/home");
        });
    });
  };
  render() {
    return (
      <React.Fragment>
        <Form>
          <FormGroup>
            <FormInput
              type="password"
              id="#password"
              placeholder="Password"
              onChange={(e) => this.onPasswordChange(e.target.value)}
              invalid={this.state.error}
            />
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
        <Button onClick={this.onSubmit}>Go</Button>
      </React.Fragment>
    );
  }
}

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usernameValid: null,
    };
  }
  onUsernameChange = (text) => {
    if (text.length > 3 && /^[a-zA-Z0-9]+$/.test(text)) {
      fetch(backendAPI + `/users/username?username=${text}`)
        .then((res) => res.json())
        .then((resJson) => {
          this.setState({
            usernameValid: resJson.isAvailable,
            username: text,
            uerror: false,
          });
        });
    } else {
      this.setState({ usernameValid: false, username: text, uerror: false });
    }
  };

  onEmailChange = (text) => {
    if (
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(text)
    ) {
      fetch(backendAPI + `/users/email?email=${text}`)
        .then((res) => res.json())
        .then((resJson) => {
          this.setState({
            email: text,
            emailValid: resJson.isAvailable,
            eerror: false,
          });
        });
    } else {
      this.setState({
        email: text,
        emailValid: false,
        eerror: false,
      });
    }
  };

  onPasswordChange = (text) => {
    if (text.length > 5) {
      this.setState({
        password: text,
        passwordValid: true,
        confirmPasswordValid: text === this.state.confirmPassword,
        perror: false,
      });
    } else
      this.setState({
        password: text,
        passwordValid: false,
        confirmPasswordValid: false,
        perror: false,
      });
  };

  onConfirmPassword = (text) => {
    if (text.length > 5 && text === this.state.password) {
      this.setState({
        confirmPassword: text,
        confirmPasswordValid: true,
        cperror: false,
      });
    } else
      this.setState({
        confirmPassword: text,
        confirmPasswordValid: false,
        cperror: false,
      });
  };

  onSubmit = () => {
    const {
      usernameValid,
      emailValid,
      passwordValid,
      confirmPasswordValid,
    } = this.state;
    if (usernameValid && emailValid && passwordValid && confirmPasswordValid) {
      const { username, email, password } = this.state;
      fetch(backendAPI + "/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }).then((res) => {
        if (res.status === 401) {
          this.setState({ error: true });
        } else this.setState({ verify: true });
      });
    } else {
      this.setState({
        uerror: !usernameValid,
        eerror: !emailValid,
        perror: !passwordValid,
        cperror: !confirmPasswordValid,
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.verify ? (
          <React.Fragment>
            <h3 className="bebas">Verify your email.</h3>
            Once you do, Log in{" "}
            <a
              href="#"
              onClick={() => {
                this.props.showLogin();
              }}
            >
              here!
            </a>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3 className="bebas" style={{ marginBottom: 20 }}>
              Sign up
            </h3>
            <FormGroup>
              <FormInput
                id="#username"
                placeholder="Username"
                onChange={(e) => this.onUsernameChange(e.target.value)}
                valid={this.state.usernameValid}
                invalid={this.state.uerror && !this.state.usernameValid}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                id="#email"
                placeholder="Email"
                onChange={(e) => this.onEmailChange(e.target.value)}
                valid={this.state.emailValid}
                invalid={this.state.eerror && !this.state.emailValid}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                type="password"
                id="#password"
                placeholder="Password"
                onChange={(e) => this.onPasswordChange(e.target.value)}
                valid={this.state.passwordValid}
                invalid={this.state.perror && !this.state.passwordValid}
              />
            </FormGroup>
            <FormGroup>
              <FormInput
                type="password"
                id="#confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => this.onConfirmPassword(e.target.value)}
                valid={this.state.confirmPasswordValid}
                invalid={this.state.cperror && !this.state.confirmPasswordValid}
              />
            </FormGroup>
            <Button onClick={this.onSubmit}>Go</Button>
            <center>
              <h4 className="bebas">Or</h4>
            </center>

            <OAuthButtons />

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
        )}
      </React.Fragment>
    );
  }
}
