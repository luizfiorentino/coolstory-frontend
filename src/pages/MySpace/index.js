import React from "react";
import { selectUserSpace } from "../../store/user/selectors";
import StoryProfile from "../../components/StoryProfile";
import { useState } from "react";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import EditProfileForm from "../../components/EditProfileForm";
import AddStoryForm from "../../components/AddStoryForm";
import { BsDash } from "react-icons/bs";
import { GiDirectorChair, GiAirplane } from "react-icons/gi";
import { GrEdit } from "react-icons/gr";

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
      <div className="my-space-call">
        <h4>My Space</h4>
      </div>
      {userSpace ? (
        <div
          className="main-container"
          style={{
            background: userSpace.backgroundColor,
            color: userSpace.color,
          }}
        >
          <div className="space-header">
            {showEditForm === false ? (
              <button onClick={openForm} className="edit-space-button">
                Edit space
              </button>
            ) : undefined}
            {showEditForm === true ? (
              <div className="ep-form">
                {" "}
                {showEditForm === true ? (
                  <EditProfileForm hideForm={hideForm} />
                ) : undefined}
              </div>
            ) : undefined}

            <div className="user-space-title">
              <h2 className="title">
                <div className="space-banner">{userSpace.title}</div>
                <BsDash />
                <h1>
                  <GiAirplane />
                </h1>
              </h2>
            </div>

            <div className="user-space-description">
              <h5>{userSpace.description}</h5>
            </div>

            <div className="user-stories-call">
              {stories.length === 0 || !stories ? (
                <h5>User posted no stories yet</h5>
              ) : (
                <h5 className="user-stories-call">Check out my stories:</h5>
              )}
            </div>
            <div className="add-story-button">
              {showStoryForm === false ? (
                <button onClick={openStoryForm}>Post new story</button>
              ) : undefined}

              {showStoryForm === true ? (
                <AddStoryForm hideForm={hideStoryForm} />
              ) : undefined}
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
