import React from "react";

import { selectUserSpace } from "../../store/user/selectors";
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

export default function EditProfileForm(props) {
  const dispatch = useDispatch();
  const userSpace = useSelector(selectUserSpace);

  const [title, setTitle] = useState(userSpace.title);
  const [description, setDescription] = useState(userSpace.description);
  const [backgroundColor, setBackgroundColor] = useState(
    userSpace.backgroundColor
  );
  const [color, setColor] = useState(userSpace.color);

  function submitEditForm(event) {
    event.preventDefault();

    dispatch(updateSpace(title, description, backgroundColor, color));

    setTitle(userSpace.title);
    setDescription(userSpace.description);
    setBackgroundColor(userSpace.backgroundColor);
    setColor(userSpace.color);
    props.hideForm(false);
  }

  return (
    <div>
      <div>
        <Container>
          <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
            <h1 className="mt-5 mb-5">edit profile</h1>
            <Form.Group>
              <Form.Label>Title</Form.Label>

              <Form.Control
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                placeholder="Enter title"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type="text"
                placeholder="Enter description"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Background Color</Form.Label>
              <input
                type="color"
                // id="head"
                // name="head"
                value={backgroundColor}
                onChange={(event) => setBackgroundColor(event.target.value)}
              ></input>
              {/* <label for="head">Head</label> */}

              <p>
                {" "}
                values= {title}, {description}, {backgroundColor}, {color}
              </p>
            </Form.Group>
            <Form.Group>
              <Form.Label>Color</Form.Label>
              <input
                type="color"
                // id="head"
                // name="head"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              ></input>
            </Form.Group>

            <Form.Group className="mt-5">
              <Button variant="primary" type="submit" onClick={submitEditForm}>
                Edit your space bro!
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    </div>
  );
}
