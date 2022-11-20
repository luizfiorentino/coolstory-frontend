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
import EditProfileForm from "../../components/EditProfileForm";

export default function MySpace() {
  const dispatch = useDispatch();
  const userSpace = useSelector(selectUserSpace);
  function openForm() {
    setEditForm(true);
  }
  console.log("userSPace", userSpace);

  // const spaceId = userSpace?.id;
  const spaceId = userSpace?.id;
  const token = useSelector(selectToken);

  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setEditForm] = useState(false);
  console.log("showEditForm:::", showEditForm);
  const [successMessage, setSuccessMessage] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState(false);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [title, setTitle] = useState(
    showEditForm === true ? userSpace.title : null
  );
  const [description, setDescription] = useState(
    showEditForm === true ? userSpace.description : null
  );
  const [backgroundColor, setBackgroundColor] = useState(
    showEditForm === true ? userSpace.backgroundColor : null
  );
  const [color, setColor] = useState(
    showEditForm === true ? userSpace.color : null
  );

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

  // const sendEditForm = () => {
  //   function submitEditForm(event) {
  //     event.preventDefault();

  //     dispatch(updateSpace(title, description, backgroundColor, color));

  //     setTitle(userSpace.title);
  //     setDescription(userSpace.description);
  //     setBackgroundColor(userSpace.backgroundColor);
  //     setColor(userSpace.color);
  //     setEditForm(false);
  //   }

  //   return (
  //     <div>
  //       <div>
  //         <Container>
  //           <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
  //             <h1 className="mt-5 mb-5">edit profile</h1>
  //             <Form.Group>
  //               <Form.Label>Title</Form.Label>

  //               <Form.Control
  //                 value={title}
  //                 onChange={(event) => setTitle(event.target.value)}
  //                 type="text"
  //                 placeholder="Enter title"
  //                 required
  //               />
  //             </Form.Group>
  //             <Form.Group>
  //               <Form.Label>Description</Form.Label>
  //               <Form.Control
  //                 value={description}
  //                 onChange={(event) => setDescription(event.target.value)}
  //                 type="text"
  //                 placeholder="Enter description"
  //                 required
  //               />
  //             </Form.Group>

  //             <Form.Group>
  //               <Form.Label>Background Color</Form.Label>
  //               <input
  //                 type="color"
  //                 // id="head"
  //                 // name="head"
  //                 value={backgroundColor}
  //                 onChange={(event) => setBackgroundColor(event.target.value)}
  //               ></input>
  //               {/* <label for="head">Head</label> */}

  //               <p>
  //                 {" "}
  //                 values= {title}, {description}, {backgroundColor}, {color}
  //               </p>
  //             </Form.Group>
  //             <Form.Group>
  //               <Form.Label>Color</Form.Label>
  //               <input
  //                 type="color"
  //                 // id="head"
  //                 // name="head"
  //                 value={color}
  //                 onChange={(event) => setColor(event.target.value)}
  //               ></input>
  //             </Form.Group>

  //             <Form.Group className="mt-5">
  //               <Button
  //                 variant="primary"
  //                 type="submit"
  //                 onClick={submitEditForm}
  //               >
  //                 Edit your space bro!
  //               </Button>
  //             </Form.Group>
  //           </Form>
  //         </Container>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div>
      {" "}
      <h2>My Space</h2>
      {userSpace ? (
        <div
          className="main-container"
          style={{
            background: userSpace.backgroundColor,
            color: userSpace.color,
          }}
        >
          <button onClick={openForm}>Edit my space</button>
          {showEditForm === true ? <EditProfileForm /> : undefined}
          <h3>{userSpace.title}</h3>
          <h4>{userSpace.description}</h4>
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
      ) : (
        "loading"
      )}
    </div>
  );
}
