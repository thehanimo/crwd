import React, { useState } from "react";
import { Button, Collapse, NavbarToggler, FormInput } from "shards-react";
import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from "shards-react";
import "./NavBar.css";
import Cookie from "js-cookie";
import { useRouteMatch } from "react-router-dom";

export default function NavBar() {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
  const isLogin = useRouteMatch("/login");
  const isHome = useRouteMatch("/home");
  const isBooks = useRouteMatch("/books");
  const isCourses = useRouteMatch("/courses");
  const isPlaylists = useRouteMatch("/playlists");

  return (
    <React.Fragment>
      <Navbar type="light" theme="light" expand="md">
        <NavbarBrand style={{ margin: 0, padding: 0 }}>
          <img
            src={require("../../images/crwd-logo-final.png")}
            style={{ height: 60 }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={setCollapseOpen} />

        <Collapse
          open={collapseOpen}
          navbar
          style={{ justifyContent: "flex-end" }}
        >
          <Nav navbar>
            <NavItem className="navItem">
              <NavLink active={isHome} href="/home">
                Home
              </NavLink>
            </NavItem>
            <NavItem className="navItem">
              <NavLink active={isBooks} href="/books">
                Books
              </NavLink>
            </NavItem>
            <NavItem className="navItem">
              <NavLink active={isCourses} href="/courses">
                Courses
              </NavLink>
            </NavItem>
            <NavItem className="navItem">
              <NavLink active={isPlaylists} href="/playlists">
                Playlists
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
                <NavLink href="/login" active={isLogin}>
                  Login
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </React.Fragment>
  );
}
