import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const PersonCard = ({ id, name, gender, profile_path }) => {
  return (
    <div className="w-100">
      <Link to={`/person/${id}`}>
        <div className="radius media-card">
          <Image
            title={name}
            className="h-100 w-100 radius"
            style={{ objectFit: "cover" }}
            src={
              profile_path !== null
                ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                : `https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png`
            }
          />
        </div>
      </Link>
      <div className="d-flex justify-content-between px-1 w-100">
        <span className="text-break">{name ? name : "Unknown"}</span>
        <span>{gender === 1 ? "Female" : "Male"}</span>
      </div>
    </div>
  );
};

export default PersonCard;
