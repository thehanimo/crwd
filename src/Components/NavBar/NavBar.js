import React from "react";
import { Button } from "shards-react";
import { Nav, NavItem, NavLink } from "shards-react";
import "./NavBar.css";
import Cookie from "js-cookie";

export default class NavBar extends React.Component {
  render() {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    return (
      <React.Fragment>
        <div
          className="container-fluid navBar"
          style={{ position: "fixed", backgroundColor: "#EEE", zIndex: 2 }}
        >
          <Nav style={{ justifyContent: "flex-end" }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-start",
              }}
            >
              <img
                src={require("../../images/crwd-logo-final.png")}
                style={{ height: 60 }}
              />
            </div>
            <NavItem className="navItem">
              <NavLink active href="/home">
                Home
              </NavLink>
            </NavItem>
            <NavItem className="navItem">
              <NavLink active href="/books">
                Books
              </NavLink>
            </NavItem>
            <NavItem className="navItem">
              <NavLink active href="/courses">
                Courses
              </NavLink>
            </NavItem>
            {JWT != "null" ? (
              <div
                onClick={() => {
                  Cookie.set("JWT", null);
                  window.location.replace("/login");
                }}
              >
                <NavItem className="navItem">
                  <NavLink href="#">Log out</NavLink>
                </NavItem>
              </div>
            ) : (
              <NavItem className="navItem">
                <NavLink href="/login">Log in</NavLink>
              </NavItem>
            )}
          </Nav>
        </div>
        <div className="container-fluid navBar" style={{ marginBottom: 60 }} />
      </React.Fragment>
    );
  }
}
