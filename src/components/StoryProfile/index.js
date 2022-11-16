import React from "react";
import { useDispatch } from "react-redux";
import { deleteThisStory } from "../../store/user/actions";

export default function StoryProfile(props) {
  const dispatch = useDispatch();
  return (
    <div>
      <h3>{props.name}</h3>
      <h4>{props.content}</h4>
      <img src={props.imageUrl} alt="foto from story" style={{ width: 500 }} />
      <button
        onClick={() => {
          dispatch(deleteThisStory(props.id));
          console.log("props.id=", props.id);
        }}
      >
        Delete Story
      </button>
    </div>
  );
}
