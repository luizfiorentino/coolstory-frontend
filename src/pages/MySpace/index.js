import React from "react";
import { selectUserSpace } from "../../store/user/selectors";
import StoryProfile from "../../components/StoryProfile";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditProfileForm from "../../components/EditProfileForm";
import AddStoryForm from "../../components/AddStoryForm";
import { BsDash, BsChatQuote } from "react-icons/bs";
import { GiAirplane } from "react-icons/gi";
import { MdAutoStories } from "react-icons/md";

import "./styles.css";

export default function MySpace() {
  const userSpace = useSelector(selectUserSpace);
  function openForm() {
    setEditForm(true);
  }

  function openStoryForm() {
    setStoryForm(true);
  }

  const stories =
    !userSpace || !userSpace.stories ? null : [...userSpace?.stories];

  const [showStoryForm, setStoryForm] = useState(false);
  const [showEditForm, setEditForm] = useState(false);

  const [successMessage, setSuccessMessage] = useState(false);

  const hideForm = (boolean) => {
    setEditForm(boolean);
  };

  const hideStoryForm = (boolean) => {
    setStoryForm(boolean);
  };

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
                <Link to={`/mySpace/edit`}> Edit space</Link>
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
              <div>
                <h3>
                  <BsChatQuote style={{ margin: 2 }} />
                </h3>
              </div>
              <h4> {userSpace.description}</h4>
            </div>

            <div className="user-stories-call">
              {stories.length === 0 || !stories ? (
                <h5 className="no-posted-stories-message">
                  User posted no stories yet
                </h5>
              ) : (
                <h5 className="user-stories-call">
                  <MdAutoStories /> Check out my stories <MdAutoStories />;
                </h5>
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
