import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const MediaCard = ({
  id,
  vote_average,
  release_date,
  poster_path,
  title,
  first_air_date,
  name,
  startpoint,
}) => {
  return (
    <div className="w-100">
      <Link to={`/${startpoint}/${id}`}>
        <div className="radius w-100 media-card">
          <Image
            className="w-100 h-100 radius"
            style={{ objectFit: "cover" }}
            src={
              poster_path !== null
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg"
            }
            title={title || name}
          />
        </div>
      </Link>
      <p className="mb-0">{title || name}</p>
      <div className="d-flex justify-content-between">
        <span className="small" style={{ color: "#fd0003" }}>
          {release_date?.slice(0, 4) || first_air_date?.slice(0, 4)}
        </span>
        <div className="d-flex gap-1 align-items-center">
          <AiFillStar size="1.1rem" color="yellow" />
          <span className="small">{vote_average?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default MediaCard;
