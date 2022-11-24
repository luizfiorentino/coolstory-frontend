import React from "react";
import { selectUserSpace } from "../../store/user/selectors";
import { useState } from "react";
import { Form, Container, Button } from "react-bootstrap/";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { postStory } from "../../store/user/actions";
import { FaRegPaperPlane } from "react-icons/fa";
import { BiPaperPlane } from "react-icons/bi";

import "./styles.css";

export default function AddStoryForm(props) {
  const dispatch = useDispatch();
  const userSpace = useSelector(selectUserSpace);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [validationErrorMessage, setValidationErrorMessage] = useState(false);

  const spaceId = userSpace?.id;

  function submitForm(event) {
    event.preventDefault();
    if (!name || !content || !imageUrl) {
      //setValidationErrorMessage(true);
      setValidationErrorMessage(true);
      return;
    }
    dispatch(postStory(name, content, imageUrl, spaceId));
    //setShowForm(false);
    //setSuccessMessage(true);
    setContent("");
    setImageUrl("");
    setName("");
    //setValidationErrorMessage(false);
    props.hideForm(false);
  }

  return (
    <div className="edit-form-main">
      <div>
        <Container className="edit-form-main">
          <Form as={Col} md={{ span: 6, offset: 3 }} className="form-field">
            <h3 className="mt-5 mb-2">Share your story!</h3>
            <Form.Group>
              <Form.Label className="form-field-inner">Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="give your story a name"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form-field-inner">Content</Form.Label>

              <Form.Control
                as="textarea"
                rows={10}
                className="story-field"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                type="content"
                placeholder="enter a content"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form-field-inner">Image</Form.Label>
              <Form.Control
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                type="imageUrl"
                placeholder="place an imageUrl"
                required
              />
            </Form.Group>
            <h4 className="image-preview-call">Image Preview</h4>
            {!imageUrl ? undefined : (
              <img alt="oops. something wrong with image Url" src={imageUrl} />
            )}

            {validationErrorMessage === true ? (
              <p className="error-message">
                Please fill in all the fields above
              </p>
            ) : undefined}
            <Form.Group className="mt-4">
              <Button variant="primary" type="submit" onClick={submitForm}>
                <div className="button-inner">
                  Post your cool story bro!{" "}
                  <BiPaperPlane className="paper-plane" />
                </div>
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    </div>
  );
}
