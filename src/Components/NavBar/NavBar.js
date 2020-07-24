import React, { useState, useEffect } from "react";
import {
  Button,
  Collapse,
  NavbarToggler,
  FormInput,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react";
import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from "shards-react";
import "./NavBar.css";
import Cookie from "js-cookie";
import { useRouteMatch } from "react-router-dom";
import { backendAPI } from "../../constants";
import { Power, Heart } from "react-feather";
import SearchBar from "../Search/SearchBar";

export default function NavBar() {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
  const isLogin = useRouteMatch("/login");
  const isHome = useRouteMatch("/home");
  const isBooks = useRouteMatch("/books");
  const isCourses = useRouteMatch("/courses");
  const isPlaylists = useRouteMatch("/playlists");
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(backendAPI + "/users/home", {
      method: "GET",
      headers: {
        Authorization: JWT,
      },
    }).then((res) => {
      if (res.status === 401) {
      } else
        res.json().then((resJson) => {
          setUser(resJson);
        });
    });
  }, []);

  return (
    <React.Fragment>
      <Navbar type="light" theme="light" expand="md">
        {!isHome && (
          <NavbarBrand style={{ margin: 0, padding: 0 }}>
            <img
              src={require("../../images/crwd-logo.svg")}
              style={{ height: 30 }}
            />
          </NavbarBrand>
        )}

        <NavbarToggler onClick={() => setCollapseOpen(!collapseOpen)} />

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
              <Dropdown
                open={dropdownOpen}
                toggle={() => setDropdownOpen(!dropdownOpen)}
              >
                <DropdownToggle nav>
                  <img
                    src={user.picture}
                    style={{
                      height: 40,
                      width: 40,
                      minWidth: 40,
                      minHeight: 40,
                      borderRadius: 40,
                      backgroundColor: "#fff",
                    }}
                  />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    style={{ color: "red" }}
                    onClick={() => {
                      Cookie.set("JWT", null);
                      window.location.replace("/login");
                    }}
                  >
                    <Power
                      size={16}
                      style={{ marginTop: -3, marginRight: 3 }}
                    />{" "}
                    Log out
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      window.location.replace("/favourites");
                    }}
                  >
                    <Heart
                      size={16}
                      style={{ marginTop: -3, marginRight: 3 }}
                    />{" "}
                    My Favourites
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
