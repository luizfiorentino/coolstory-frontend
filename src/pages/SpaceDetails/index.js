import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spaceDetailsThunk } from "../../store/spaces/thunks";

import { selectSpaceDetails } from "../../store/spaces/selectors";
import { useParams } from "react-router-dom";
import StoryCard from "../../components/StoryCard";
import "./styles.css";

export default function SpaceDetails() {
  const dispatch = useDispatch();
  const details = useSelector(selectSpaceDetails);

  const spaceId = useParams().id;

  useEffect(() => {
    dispatch(spaceDetailsThunk(spaceId));
  }, [dispatch]);

  const colorDetails = details?.color;
  const backgroundColor = details?.backgroundColor;

  return (
    <div className="my-space-main-container">
      <h4>Space Details</h4>
      <div
        className="main-container"
        style={{ color: colorDetails, background: backgroundColor }}
      >
        <div className="space-header">
          <div className="user-space-title">
            <h2 className="title">{details?.title}</h2>
          </div>
          <div className="user-space-description">
            <h4>{details?.description}</h4>
          </div>
          <div className="user-stories-call">
            {details?.stories?.length === 0 || !details?.stories ? (
              <h5>User posted no stories yet</h5>
            ) : (
              <h5>Check out my stories</h5>
            )}
          </div>
        </div>

        <div className="stories-container">
          {details?.stories?.map((story) => (
            <StoryCard
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
