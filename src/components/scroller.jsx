import React, { useRef } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Arrow from "./Arrow";
import Spinner from "./Spinner";

const Scroller = ({ data, mapped, link, url, fetch }) => {
  const scrollRef = useRef();

  const scroll = (direction) => {
    const { current } = scrollRef;
    direction === "left"
      ? (current.scrollLeft -= 500)
      : (current.scrollLeft += 500);
  };

  const personNull =
    "https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png";
  const movieNull =
    "https://www.prokerala.com/movies/assets/img/no-poster-available.jpg";
  const linkStart = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className="mb-5 position-relative">
      <div className="d-flex justify-content-between mb-1 w-100">
        <span>{data}</span>
        <Link style={{ color: "#fd0003" }} to={link}>
          {data !== "Recommendations" ? <span>See All</span> : ""}
        </Link>
      </div>

      {fetch && <Spinner />}

      {!fetch && (
        <>
          {mapped?.length !== 0 ? (
            <div className="media-scroller snaps scrollbody" ref={scrollRef}>
              {mapped?.map((each) => (
                <Link key={each.id} to={`${url}/${each.id}`}>
                  <div className="radius">
                    <Image
                      src={
                        each.profile_path || each.poster_path
                          ? `${linkStart}${
                              each.profile_path || each.poster_path
                            }`
                          : !each.profile_path && each.poster_path !== null
                          ? personNull
                          : movieNull
                      }
                      className="inline radius"
                      style={{ objectFit: "cover" }}
                      title={each.title || each.name}
                    />
                  </div>
                </Link>
              ))}
              {mapped?.length > 7 ? <Arrow scroll={scroll} /> : null}
            </div>
          ) : (
            <p>No {data}</p>
          )}
        </>
      )}
    </div>
  );
};

export default Scroller;
