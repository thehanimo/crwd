import React, { useState, useEffect } from "react";
import { Container, Row, Col, FormInput, Button } from "shards-react";
import { Search } from "react-feather";

import "loaders.css/loaders.css";
import { searchAPI } from "../../constants";
var Loader = require("react-loaders").Loader;

export default function SearchBar(props) {
  const [data, setData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  let timeout = null;

  const search = (ter) => {
    let term = ter.nativeEvent.srcElement.value;
    setData([]);
    if (term.length < 3) return;
    setIsSearching(true);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fetch(searchAPI + `?q=${term}&autofill=true`).then((res) =>
        res.json().then((resJson) => {
          setData(resJson);
          setIsSearching(false);
        })
      );
    }, 500);
  };

  useEffect(() => {
    document.getElementById("inp-search-bar").value = props.term || "";
  }, []);

  return (
    <Container style={{ zIndex: 100 }}>
      <Row>
        <Col
          style={{
            marginTop: 50,
            marginBottom: 90,
          }}
        >
          <div style={{ position: "absolute", width: 500, left: "50%" }}>
            <div style={{ position: "relative", left: "-50%" }}>
              <FormInput
                id="inp-search-bar"
                placeholder="🔍 Search for Books, Courses or Playlists..."
                onChange={search}
                onKeyDown={(e) => {
                  let term = e.nativeEvent.srcElement.value.trim();
                  if (term == "") return;
                  if (e.key === "Enter")
                    window.location.replace("/search/" + term);
                }}
              />
              <div
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
                  marginTop: 10,
                }}
              >
                {data.map((item, index) => (
                  <a
                    style={{
                      width: "100%",
                      color: "#333",
                      borderBottom: "2px solid #EEE",
                      padding: "8px 16px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                      textDecoration: "none",
                    }}
                    className="searchdropdown"
                    href={"/" + item.link}
                  >
                    {item.title}
                  </a>
                ))}
              </div>

              <div
                style={{
                  height: 40,
                  width: 40,
                  position: "absolute",
                  top: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isSearching && (
                  <Loader
                    type="line-spin-fade-loader"
                    active
                    color="gray"
                    style={{ transform: "scale(0.3)" }}
                  />
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
