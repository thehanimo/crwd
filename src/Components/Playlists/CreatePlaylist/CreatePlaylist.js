import React, { useState } from "react";
import Cookie from "js-cookie";
import {
  Container,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormTextarea,
  Button,
  Card,
  CardTitle,
  Fade,
  Alert,
} from "shards-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ReactTinyLink } from "react-tiny-link";

import { Trash2, XCircle } from "react-feather";
import { playlistsAPI } from "../../../constants";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 8 * 2,
  margin: `0 0 ${8}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "transparent",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  //   padding: 8,
  //   width: 250,
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list).slice();
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function CreatePlaylist() {
  const [checkValid, setCheckValid] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState([
    { id: "1", title: "", description: "", link: "" },
  ]);
  let count = 1;
  const JWT = Cookie.get("JWT") ? Cookie.get("JWT") : "null";
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(links, result.source.index, result.destination.index);
    setLinks(items);
  };
  const formError = () => {
    setShowFailureAlert(true);
    setTimeout(() => {
      setShowFailureAlert(false);
    }, 2000);
  };

  const checkFields = () => {
    setCheckValid(true);
    if (title.trim() === "") {
      formError();
      return;
    }
    if (description.trim() === "") {
      formError();
      return;
    }
    for (let i = 0; i < links.length; i++) {
      if (links[i].title.trim() === "") {
        formError();
        return;
      }
      if (
        links[i].link.trim() === "" ||
        !/^https?:\/\/./i.test(links[i].link)
      ) {
        formError();
        return;
      }
    }
    submitPlaylist();
  };

  const submitPlaylist = () => {
    let playlistinfo = {};
    playlistinfo.content = links.map((a) => {
      delete a["id"];
      a.title.trim();
      a.link.trim();
      a.description.trim();
      return a;
    });
    fetch(playlistsAPI, {
      method: "POST",
      headers: {
        Authorization: JWT,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        playlistinfo,
      }),
    }).then(async (res) => {
      if (res.status === 401 || res.status === 500) {
        return;
      } else {
        window.location.href = "/playlists";
      }
    });
  };
  return (
    <Container>
      <Alert
        theme="danger"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
        className="mb3"
        open={showFailureAlert}
      >
        <XCircle size={16} style={{ marginTop: -3 }} /> Oops! Fix the errors and
        try again. 🙁
      </Alert>
      <Row>
        <Col>
          <h3
            className="bebas"
            style={{ marginTop: 60, fontSize: 40, marginBottom: 60 }}
          >
            Create Your Playlist! 📝
          </h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form style={{ marginBottom: 30 }}>
            <FormGroup>
              <FormInput
                invalid={checkValid && title.trim() === ""}
                style={{
                  fontSize: 30,
                  fontFamily: "Poppins",
                  fontWeight: "bold",
                }}
                placeholder="Write an interesting title..."
                onChange={(e) => {
                  setTitle(e.nativeEvent.srcElement.value);
                }}
                maxLength={100}
              />
            </FormGroup>
            <FormGroup>
              <FormTextarea
                invalid={checkValid && description.trim() === ""}
                placeholder="Describe what your playlist does..."
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins",
                }}
                onChange={(e) => {
                  setDescription(e.nativeEvent.srcElement.value);
                }}
                maxLength={500}
              />
            </FormGroup>
          </Form>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {links.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <Fade in={!item.removed}>
                            <Card
                              style={{
                                margin: 16,
                                padding: 16,
                              }}
                            >
                              {links.length !== 1 && (
                                <>
                                  <div
                                    style={{
                                      height: 50,
                                      width: 50,
                                      borderRadius: 50,
                                      position: "absolute",
                                      top: -15,
                                      right: -15,
                                      backgroundColor: "white",
                                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                                    }}
                                  />
                                  <Button
                                    theme="danger"
                                    outline
                                    style={{
                                      height: 50,
                                      width: 50,
                                      borderRadius: 50,
                                      position: "absolute",
                                      top: -15,
                                      right: -15,
                                      margin: 0,
                                      padding: 0,
                                    }}
                                    onClick={() => {
                                      let newLinks = links.slice();
                                      newLinks[index].removed = true;
                                      console.log(newLinks);
                                      setLinks(newLinks);
                                      setTimeout(() => {
                                        newLinks.splice(index, 1);
                                        let temp = newLinks.slice();
                                        setLinks(temp);
                                      }, 250);
                                    }}
                                  >
                                    <Trash2 size={20} />
                                  </Button>
                                </>
                              )}

                              <FormInput
                                invalid={
                                  checkValid && links[index].title.trim() === ""
                                }
                                placeholder="Title"
                                style={{
                                  fontSize: 20,
                                  fontFamily: "Poppins",
                                  fontWeight: 500,
                                  marginBottom: 20,
                                }}
                                onChange={(e) => {
                                  let temp = links.slice();
                                  temp[index].title =
                                    e.nativeEvent.srcElement.value;
                                  setLinks(temp);
                                }}
                                maxLength={100}
                              />
                              <FormTextarea
                                placeholder="Link Description (Optional)"
                                style={{
                                  fontSize: 16,
                                  fontFamily: "Poppins",
                                  marginBottom: 20,
                                }}
                                onChange={(e) => {
                                  let temp = links.slice();
                                  temp[index].description =
                                    e.nativeEvent.srcElement.value;
                                  setLinks(temp);
                                }}
                                maxLength={500}
                              />
                              {/^https?:\/\/./i.test(item.link) && (
                                <ReactTinyLink
                                  showGraphic={true}
                                  maxLine={2}
                                  minLine={1}
                                  width={null}
                                  url={item.link}
                                />
                              )}

                              <FormInput
                                invalid={
                                  checkValid &&
                                  (links[index].link.trim() === "" ||
                                    !/^https?:\/\/./i.test(item.link))
                                }
                                placeholder="Link to the resource"
                                style={{ color: "#007BFF" }}
                                onChange={(e) => {
                                  let temp = links.slice();
                                  temp[index].link =
                                    e.nativeEvent.srcElement.value;
                                  setLinks(temp);
                                }}
                                maxLength={500}
                              />
                            </Card>
                          </Fade>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {links.length < 10 && (
            <Button
              size="sm"
              outline
              pill
              style={{
                float: "right",
                marginTop: -20,
                marginBottom: 20,
              }}
              onClick={() =>
                setLinks(
                  links.concat({
                    id: "" + ++count,
                    title: "",
                    description: "",
                    link: "",
                  })
                )
              }
            >
              Add Link
            </Button>
          )}
        </Col>
      </Row>
      <Row style={{ paddingBottom: 100, justifyContent: "center" }}>
        <Button
          theme="success"
          style={{ float: "middle", marginTop: 0 }}
          onClick={checkFields}
          size="lg"
        >
          Create Your Playlist
        </Button>
      </Row>
    </Container>
  );
}
