import React from "react";
import "./styles.css";

export default function StoryCard(props) {
  return (
    <div>
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
      </div>
    </div>
  );
}
