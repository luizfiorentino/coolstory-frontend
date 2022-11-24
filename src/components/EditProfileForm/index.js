import React from "react";
import { selectUserSpace } from "../../store/user/selectors";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { updateSpace } from "../../store/user/actions";
import "./styles.css";

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
    <div className="edit-form-main">
      <div>
        <Container className="edit-form-main">
          {/* <Form as={Col} className="form-field"> */}
          <Form as={Col} md={{ span: 6, offset: 3 }} className="form-field">
            {/* <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5"> */}
            <h3>edit profile</h3>
            <Form.Group>
              <Form.Label className="form-field-inner">Title</Form.Label>

              <Form.Control
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                type="text"
                placeholder="Enter title"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-field-inner">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                type="text"
                placeholder="Enter description"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="form-field-inner">
                Background Color
              </Form.Label>
              <input
                className="color-input"
                type="color"
                // id="head"
                // name="head"

                value={backgroundColor}
                onChange={(event) => setBackgroundColor(event.target.value)}
              ></input>
              {/* <label for="head">Head</label> */}
            </Form.Group>
            <Form.Group>
              <Form.Label className="form-field-inner">Color</Form.Label>
              <input
                className="color-input"
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
