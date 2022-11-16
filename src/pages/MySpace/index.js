import React from "react";

import { selectUserSpace } from "../../store/user/selectors";
import StoryProfile from "../../components/StoryProfile";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { postStory } from "../../store/user/actions";

export default function MySpace() {
  const dispatch = useDispatch();
  const userSpace = useSelector(selectUserSpace);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState(false);

  const token = useSelector(selectToken);

  const spaceId = userSpace?.id;

  function postCoolStory() {
    setShowForm(true);
  }

  const SendForm = () => {
    function submitForm(event) {
      event.preventDefault();
      if (!name || !content || !imageUrl) {
        setValidationErrorMessage(true);
        return;
      }
      dispatch(postStory(name, content, imageUrl, spaceId));
      setShowForm(false);
      setSuccessMessage(true);
      setContent("");
      setImageUrl("");
      setName("");
      setValidationErrorMessage(false);
    }

    return (
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Share your story!</h1>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              placeholder="Enter name"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Content</Form.Label>
            <Form.Control
              value={content}
              onChange={(event) => setContent(event.target.value)}
              type="content"
              placeholder="Enter content"
              required
            />
            <Form.Text>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>image</Form.Label>
            <Form.Control
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              type="imageUrl"
              placeholder="imageUrl"
              required
            />
          </Form.Group>
          <h3>Image Preview</h3>
          <img src={imageUrl} />
          {validationErrorMessage === true ? (
            <h3>Please fill in all the fields above</h3>
          ) : undefined}
          <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={submitForm}>
              Post your cool story bro!
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  };

  console.log("spacepage", userSpace);
  return (
    <div>
      {" "}
      <h2>My Space</h2>
      <div
        className="main-container"
        style={{
          background: userSpace?.backgroundColor,
          color: userSpace?.color,
        }}
      >
        <h3>{userSpace?.title}</h3>
        <h4>{userSpace?.description}</h4>
        <div className="stories-container">
          {userSpace
            ? userSpace.stories?.map((story) => (
                <StoryProfile
                  id={story.id}
                  name={story.name}
                  content={story.content}
                  imageUrl={story.imageUrl}
                />
              ))
            : "Loading"}
        </div>
        {successMessage === true ? (
          <h3>Story Successfully Posted bro!</h3>
        ) : undefined}

        <button onClick={postCoolStory}>Post a cool story bro</button>
        {showForm === true ? SendForm() : undefined}
      </div>
    </div>
  );
}
