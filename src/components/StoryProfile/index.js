import React from "react";
import { useDispatch } from "react-redux";
import { deleteThisStory } from "../../store/user/actions";
import "./styles.css";

export default function StoryProfile(props) {
  const dispatch = useDispatch();
  return (
    <div className="story-card-main">
      <div className="story-title">
        <h3>{props.name}</h3>
      </div>

      <div className="story-image">
        <img src={props.imageUrl} alt="foto from story" />
      </div>
      <div className="story-content">
        <p>{props.content}</p>
      </div>
      <div className="delete-story-button">
        <button
          onClick={() => {
            dispatch(deleteThisStory(props.id));
            console.log("props.id=", props.id);
          }}
        >
          Delete Story
        </button>
      </div>
    </div>
  );
}
