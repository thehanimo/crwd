import React from "react";
import { Button } from "shards-react";
import { Nav, NavItem, NavLink } from "shards-react";
import "./NavBar.css";

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="container-fluid navBar">
        <Nav>
          {/* <div style={{ height: "60px", width: 100, backgroundColor: "red" }} /> */}
          <NavItem className="navItem">
            <NavLink active href="/home">
              Home
            </NavLink>
          </NavItem>
          <NavItem className="navItem">
            <NavLink href="/landing">Log in</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}
