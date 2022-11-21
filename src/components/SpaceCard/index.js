import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function SpaceCard(props) {
  return (
    <div
      className="space-card-main"
      style={{ color: props.color, background: props.backgroundColor }}
    >
      <h2>{props.title}</h2>
      <div className="more-button">
        <button className="more-button-inner">
          <Link to={`/spaces/${props.id}`}>More</Link>
        </button>
      </div>
    </div>
  );
}
