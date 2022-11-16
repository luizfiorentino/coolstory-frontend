import React from "react";
import { useSelector } from "react-redux";
import { selectUserSpace } from "../../store/user/selectors";
import StoryProfile from "../../components/StoryProfile";
import { useDispatch } from "react-redux";
import { deleteStory } from "../../store/user/slice";

export default function MySpace() {
  const dispatch = useDispatch();
  const userSpace = useSelector(selectUserSpace);

  console.log("spacepage", userSpace);
  return (
    <div>
      {" "}
      <h2>My Space</h2>
      <div
        className="main-container"
        style={{
          background: userSpace?.backgroundColor,
          color: userSpace?.color,
        }}
      >
        <h3>{userSpace?.title}</h3>
        <h4>{userSpace?.description}</h4>
        <div className="stories-container">
          {userSpace?.stories?.map((story) => (
            <StoryProfile
              id={story.id}
              name={story.name}
              content={story.content}
              imageUrl={story.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
