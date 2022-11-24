import React from "react";
import { Link } from "react-router-dom";
import { FaSpaceShuttle } from "react-icons/fa";

import "./styles.css";

export default function SpaceCard(props) {
  return (
    <div
      className="space-card-main"
      style={{ color: props.color, background: props.backgroundColor }}
    >
      <div className="space-name-call">
        <h2>
          <FaSpaceShuttle className="title-icon" />

          {props.title}
        </h2>
      </div>

      <div className="more-button">
        <button className="more-button-inner">
          <Link to={`/spaces/${props.id}`}>More</Link>
        </button>
      </div>
    </div>
  );
}
