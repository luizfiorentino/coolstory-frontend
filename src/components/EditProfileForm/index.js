import React from "react";
import { selectUserSpace } from "../../store/user/selectors";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { updateSpace } from "../../store/user/actions";
import DeleteAccount from "../DeleteAccount";

import "./styles.css";
import { GiCogLock } from "react-icons/gi";

export default function EditProfileForm(props) {
  const dispatch = useDispatch();
  const userSpace = useSelector(selectUserSpace);
  const navigate = useNavigate();

  const [title, setTitle] = useState(userSpace ? userSpace.title : null);
  const [edited, setEdited] = useState(false);
  const [description, setDescription] = useState(
    userSpace ? userSpace.description : null
  );
  const [backgroundColor, setBackgroundColor] = useState(
    userSpace ? userSpace.backgroundColor : null
  );
  const [color, setColor] = useState(userSpace ? userSpace.color : null);
  const [delete_space_Clicked, set_delete_space_clicked] = useState(false);

  function submitEditForm(event) {
    event.preventDefault();
    setEdited(true);

    dispatch(updateSpace(title, description, backgroundColor, color));

    setTitle(userSpace.title);
    setDescription(userSpace.description);
    setBackgroundColor(userSpace.backgroundColor);
    setColor(userSpace.color);
    if (!props.hideForm) {
      return;
    }
    props.hideForm(false);
  }

  const deleteSpace = () => {
    set_delete_space_clicked(!delete_space_Clicked);
    console.log(delete_space_Clicked);
  };

  useEffect(() => {
    if (edited == true) {
      navigate("/mySpace");
    }
  }, [edited, navigate]);

  return (
    <div className="edit-form-main">
      {delete_space_Clicked === true ? (
        <DeleteAccount deleteSpace={deleteSpace} />
      ) : (
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
              <Button variant="primary" type="submit" onClick={deleteSpace}>
                Delete space
              </Button>
            </Form.Group>
            <Form.Group className="mt-5">
              <Button
                className="edit-button"
                variant="primary"
                type="submit"
                onClick={submitEditForm}
              >
                Edit your space bro!{" "}
              </Button>
            </Form.Group>
          </Form>
        </Container>
      )}
      <div></div>
    </div>
  );
}
