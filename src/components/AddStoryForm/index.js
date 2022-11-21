import React from "react";

import { selectUserSpace, selectStories } from "../../store/user/selectors";
import StoryProfile from "../../components/StoryProfile";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { postStory, updateSpace } from "../../store/user/actions";
import { Next } from "react-bootstrap/esm/PageItem";
import EditProfileForm from "../../components/EditProfileForm";

export default function AddStoryForm() {
  const dispatch = useDispatch();
  const userSpace = useSelector(selectUserSpace);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const spaceId = userSpace?.id;

  function submitForm(event) {
    event.preventDefault();
    if (!name || !content || !imageUrl) {
      //setValidationErrorMessage(true);
      return;
    }
    dispatch(postStory(name, content, imageUrl, spaceId));
    //setShowForm(false);
    //setSuccessMessage(true);
    setContent("");
    setImageUrl("");
    setName("");
    //setValidationErrorMessage(false);
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
        </Form.Group>

        <Form.Group>
          <Form.Label>Image</Form.Label>
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
        {/* {validationErrorMessage === true ? (
            <h3>Please fill in all the fields above</h3>
          ) : undefined} */}
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Post your cool story bro!
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
