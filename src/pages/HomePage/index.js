import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSpacesThunk } from "../../store/spaces/thunks";
import HeroBanner from "../../components/HeroBanner";
import SpaceCard from "../../components/SpaceCard";
import { selectAllSpaces } from "../../store/spaces/selectors";

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
        <div>
          <h3>Check out the list of spaces!</h3>
          {spaces.map((space) => (
            <SpaceCard title={space.title} id={space.id} />
          ))}
        </div>
      </HeroBanner>
    </div>
  );
}
