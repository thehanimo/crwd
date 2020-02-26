import React from "react";
import { Button } from "shards-react";
import { Nav, NavItem, NavLink } from "shards-react";
import "./NavBar.css";
import Cookie from "js-cookie";

export default class NavBar extends React.Component {
  render() {
    const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
    return (
      <div className="container-fluid navBar">
        <Nav style={{ justifyContent: "flex-end" }}>
          {/* <div style={{ height: "60px", width: 100, backgroundColor: "red" }} /> */}
          <NavItem className="navItem">
            <NavLink active href="/home">
              Home
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
    );
  }
}
