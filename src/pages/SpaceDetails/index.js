import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spaceDetailsThunk } from "../../store/spaces/thunks";

import { selectSpaceDetails } from "../../store/spaces/selectors";
import { useParams } from "react-router-dom";
import StoryCard from "../../components/StoryCard";

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
    <div style={{ color: colorDetails, background: backgroundColor }}>
      <h2>Space Details</h2>
      <h3>{details?.title}</h3>
      <h4>{details?.description}</h4>
      {details?.stories?.map((story) => (
        <StoryCard
          id={story.id}
          name={story.name}
          content={story.content}
          imageUrl={story.imageUrl}
        />
      ))}
    </div>
  );
}
