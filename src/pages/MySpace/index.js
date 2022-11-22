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
import AddStoryForm from "../../components/AddStoryForm";
import "./styles.css";
export default function MySpace() {
  const dispatch = useDispatch();
  const userSpace = useSelector(selectUserSpace);
  function openForm() {
    setEditForm(true);
  }

  function openStoryForm() {
    setStoryForm(true);
  }

  console.log("userSPace", userSpace);

  // const spaceId = userSpace?.id;
  const spaceId = userSpace?.id;
  const token = useSelector(selectToken);
  const stories =
    !userSpace || !userSpace.stories ? null : [...userSpace?.stories];
  console.log("mySpace page userSpace", userSpace);
  const [showForm, setShowForm] = useState(false);
  const [showStoryForm, setStoryForm] = useState(false);
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

  const hideForm = (boolean) => {
    setEditForm(boolean);
    console.log("callback prop called", boolean);
  };

  const hideStoryForm = (boolean) => {
    setStoryForm(boolean);
    console.log("callback prop called", boolean);
  };

  function postCoolStory() {
    setShowForm(true);
  }

  const sort_date = (story_a, story_b) => {
    return story_b.createdAt.localeCompare(story_a.createdAt);
  };

  return (
    <div className="my-space-main-container">
      {" "}
      <h4>My Space</h4>
      {userSpace ? (
        <div
          className="main-container"
          style={{
            background: userSpace.backgroundColor,
            color: userSpace.color,
          }}
        >
          <div className="space-header">
            <div className="user-space-title">
              <h2 className="title">{userSpace.title}</h2>
            </div>
            <div className="edit-space-button">
              {" "}
              {showEditForm === false ? (
                <button onClick={openForm}>Edit my space</button>
              ) : undefined}
              {showEditForm === true ? (
                <EditProfileForm hideForm={hideForm} />
              ) : undefined}
            </div>
            <div className="user-space-description">
              <h4>{userSpace.description}</h4>
            </div>

            <div className="add-story-button">
              {showStoryForm === false ? (
                <button onClick={openStoryForm}>Add a story bro!</button>
              ) : undefined}

              {showStoryForm === true ? (
                <AddStoryForm hideForm={hideStoryForm} />
              ) : undefined}
            </div>
            <div className="user-stories-call">
              {stories.length === 0 || !stories ? (
                <h5>User posted no stories yet</h5>
              ) : (
                <h5>Check out my stories</h5>
              )}
            </div>
          </div>
          <div className="stories-container">
            {stories
              ? stories
                  .sort(sort_date)
                  .map((story, index) => (
                    <StoryProfile
                      key={index}
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
        </div>
      ) : (
        "loading"
      )}
    </div>
  );
}
