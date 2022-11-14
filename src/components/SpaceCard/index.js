import React from "react";
import { Link } from "react-router-dom";

export default function SpaceCard(props) {
  return (
    <div style={{ color: props.color, background: props.backgroundColor }}>
      <h2>{props.title}</h2>
      <button>
        <Link to={`/spaces/${props.id}`}>More</Link>
      </button>
    </div>
  );
}
