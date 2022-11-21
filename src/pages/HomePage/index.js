import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpacesThunk } from "../../store/spaces/thunks";
import HeroBanner from "../../components/HeroBanner";
import SpaceCard from "../../components/SpaceCard";
import { selectAllSpaces } from "../../store/spaces/selectors";
import "./styles.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const spaces = useSelector(selectAllSpaces);

  useEffect(() => {
    dispatch(allSpacesThunk);
  }, [dispatch]);

  return (
    <div>
      <HeroBanner>
        <h1>Home</h1>
      </HeroBanner>
      <div className="home-page-content">
        <div className="list-of-spaces-call">
          <h3 className="list-of-spaces-text">Check out our users' spaces!</h3>
        </div>
        <div className="space-items">
          {spaces.map((space) => (
            <SpaceCard
              title={space.title}
              id={space.id}
              backgroundColor={space.backgroundColor}
              color={space.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
