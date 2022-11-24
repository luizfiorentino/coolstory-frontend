import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { spaceDetailsThunk } from "../../store/spaces/thunks";
import { selectSpaceDetails } from "../../store/spaces/selectors";
import { useParams } from "react-router-dom";
import StoryCard from "../../components/StoryCard";
import { FaSpaceShuttle } from "react-icons/fa";
import { GiAirplane } from "react-icons/gi";
import { TbMinusVertical, TbGripVertical } from "react-icons/tb";
import { BsDash, BsGripVertical, BsInfoSquareFill } from "react-icons/bs";
import { SlPencil } from "react-icons/sl";
import { MdAutoStories } from "react-icons/md";
import { BiAlignRight, BiChevronsRight, BiWater } from "react-icons/bi";
import {
  TfiShiftRightAlt,
  TfiItalic,
  TfiShiftLeftAlt,
  TfiAlignRight,
  TfiAlignJustify,
  TfiRuler,
} from "react-icons/tfi";

import {
  SlArrowLeft,
  SlArrowRight,
  SlControlEnd,
  SlControlPlay,
  SlPaperPlane,
} from "react-icons/sl";

import {
  FiChevronsLeft,
  FiChevronsRight,
  FiGitCommit,
  FiMinus,
} from "react-icons/fi";

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
            <h3> </h3>
            <h2 className="title">
              <div className="space-banner">{details?.title}</div>
              <BsDash />
              <h1>
                <GiAirplane />
              </h1>
            </h2>
          </div>
          <div className="user-space-description">
            <h4> {details?.description}</h4>
          </div>
          <div className="user-stories-call">
            {details?.stories?.length === 0 || !details?.stories ? (
              <h5>User posted no stories yet</h5>
            ) : (
              <h5 className="user-stories-inner">
                <MdAutoStories /> Check out my stories <MdAutoStories />
              </h5>
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
