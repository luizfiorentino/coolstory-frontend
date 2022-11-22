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

  const allSpaces = spaces ? [...spaces] : null;
  console.log("HP all spaces:", allSpaces);

  const spacesAlphaOrder = (space_a, space_b) => {
    return space_a.title.localeCompare(space_b.title);
  };

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
          {allSpaces
            ? allSpaces
                .sort(spacesAlphaOrder)
                .map((space) => (
                  <SpaceCard
                    title={space?.title}
                    id={space?.id}
                    backgroundColor={space?.backgroundColor}
                    color={space?.color}
                  />
                ))
            : "Loading"}
        </div>
      </div>
    </div>
  );
}
