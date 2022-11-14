import React from "react";

export default function StoryCard(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <h4>{props.content}</h4>
      <img src={props.imageUrl} alt="foto from story" />
    </div>
  );
}
