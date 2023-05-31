import React, { useState, useEffect, useRef } from "react";
import { Image } from "react-bootstrap";
import { AiFillStar, AiFillClockCircle } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import Scroller from "./scroller";
import Imagebox from "./Imagebox";
import VideoBox from "./VideoBox";
import { useNavigate, Link } from "react-router-dom";
import Arrow from "./Arrow";
import { useStateContext } from "../Library/Context";

const MovieTvId = ({
  backdrop_path,
  credits,
  genres,
  images,
  original,
  overview,
  poster_path,
  recommendations,
  release,
  runtime,
  tagline,
  videos,
  vote_average,
  episodes,
  media,
}) => {
  const scrollRef = useRef();
  const scrollRefB = useRef();
  const scrollRefC = useRef();
  const navigate = useNavigate();
  const { addTo, favorites, save, watch } = useStateContext();
  const [seeAll, setSeeAll] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageIndex, setImageIndex] = useState(1);
  const [showVideo, setShowVideo] = useState(false);
  const [videoIndex, setVideoIndex] = useState(1);

  const present = favorites.find((each) => each.id === media.id);
  const present2 = watch.find((each) => each.id === media.id);

  useEffect(() => {
    if (showImage || showVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showImage, showVideo]);

  const scroll = (direction) => {
    const { current } = scrollRef;
    direction === "left"
      ? (current.scrollLeft -= 500)
      : (current.scrollLeft += 500);
  };

  const scrollB = (direction) => {
    const { current } = scrollRefB;
    direction === "left"
      ? (current.scrollLeft -= 500)
      : (current.scrollLeft += 500);
  };

  const scrollC = (direction) => {
    const { current } = scrollRefC;
    direction === "left"
      ? (current.scrollLeft -= 500)
      : (current.scrollLeft += 500);
  };

  return (
    <div className="w-100 text-white mb-3 position-relative">
      <div
        className="d-lg-none position-relative md-image bg-grey"
        style={{ width: "100%" }}
      >
        <Image
          style={{ objectFit: "cover" }}
          className="w-100 h-100"
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        />
        <div
          className="position-absolute px-2 py-1 w-100"
          style={{ bottom: "0px", background: "rgb(27, 27, 27, 0.5)" }}
        >
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div>
              <span className="fs-5">{original}</span>
              <div className="d-flex gap-2">
                <div className="d-flex align-items-center gap-1">
                  <AiFillStar color="yellow" />
                  <span className="small">{vote_average?.toFixed(2)}</span>
                </div>
                <span className="small">{release}</span>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div
                className="d-flex flex-column align-items-center"
                style={{ width: "80px" }}
                onClick={() => addTo(media)}
              >
                <MdAdd size="1.5rem" color="#fd0003" />
                <span className="small text-center text-break">
                  {present ? "Remove from favorite" : "Add to favorite"}
                </span>
              </div>
              <div
                className="d-flex flex-column align-items-center"
                style={{ width: "80px" }}
                onClick={() => save(media)}
              >
                <AiFillClockCircle size="1.4rem" color="#fd0003" />
                <span className="small text-center">
                  {present2 ? "Remove from watch later" : "Save to watch later"}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="position-absolute"
          style={{ top: "10px", left: "10px" }}
        >
          <BiArrowBack
            className="cursor"
            size="1.5rem"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>

      <div className="position-relative mb-3">
        <div className="d-none d-lg-block position-absolute top-0 left-0 w-100 h-100">
          <Image
            className="w-100 h-100"
            style={{ objectFit: "cover", opacity: "0.1" }}
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          />
        </div>

        <div className="position-relative px-2 py-2" style={{ zIndex: "8" }}>
          <div className="d-lg-flex gap-2 mb-3">
            <div
              className="d-none d-lg-block"
              style={{ width: "270px", height: "400px" }}
            >
              <Image
                style={{ objectFit: "cover", width: "270px", height: "400px" }}
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              />
            </div>
            <div className="d-flex flex-column gap-3 w-100">
              <div className="d-none d-lg-block mb-0">
                <h3 className="mb-0" style={{ color: "#ffa101" }}>
                  {original}
                </h3>
                <div className="d-flex gap-2">
                  <div className="d-flex align-items-center gap-1">
                    <AiFillStar color="yellow" />
                    <span className="small">{vote_average?.toFixed(2)}</span>
                  </div>
                  <span className="small">{release}</span>
                </div>
              </div>
              <div className="mb-0">
                <h5 className="mb-0">
                  {runtime ? "Runtime" : "Number of episodes"}
                </h5>
                <span className="small">
                  {runtime
                    ? runtime < 60
                      ? `${runtime}mins `
                      : runtime === 60
                      ? "1hr"
                      : runtime < 120
                      ? `${Math.floor(runtime / 60)}hr ${runtime % 60}mins`
                      : `${Math.floor(runtime / 60)}hrs ${runtime % 60}mins`
                    : episodes}
                </span>
              </div>
              <div className="mb-0">
                <h5 className="mb-0">Overview</h5>
                <span style={{ color: "#fd0003" }}>
                  {tagline}{" "}
                  <span
                    onClick={() => setSeeAll(true)}
                    className={
                      seeAll ? "d-none" : "d-lg-none text-primary cursor"
                    }
                  >
                    See more...
                  </span>
                </span>
              </div>

              <div
                className={
                  seeAll
                    ? "d-flex flex-column gap-3"
                    : "d-none d-lg-flex flex-column gap-3"
                }
              >
                {overview?.split("\n\n").map((paragraph, index) => (
                  <p className="mb-0 text-break small" key={index}>
                    {paragraph
                      ?.split("\n")
                      ?.reduce((total, line) => [total, <br />, line])}
                  </p>
                ))}
                <div className="mb-0">
                  <h5 className="mb-0">Screenplay</h5>
                  <span>
                    {credits?.crew[0]?.job} - {credits?.crew[0]?.original_name}
                  </span>
                </div>
                <div className="mb-0">
                  <h5 className="mb-0">
                    {genres?.length > 1 ? "Genres" : "Genre"}
                  </h5>
                  <div className="d-lg-flex justify-content-between align-items-center">
                    <div className="d-flex flex-wrap gap-3">
                      {genres?.map((each, index) => (
                        <Link
                          key={index}
                          to={
                            runtime
                              ? `/movie/genres/${each.id}`
                              : `/tv/genres/${each.id}`
                          }
                        >
                          <span
                            className="small text rounded-3 p-2 text-dark cursor"
                            style={{ backgroundColor: "#fd0003" }}
                          >
                            {each?.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="d-none d-lg-flex align-items-center gap-2">
                      <div
                        className="d-flex flex-column cursor align-items-center"
                        onClick={() => addTo(media)}
                      >
                        <MdAdd size="1.5rem" color="#fd0003" />
                        <span className="small text-center text-break">
                          {present ? "Remove from favorite" : "Add to favorite"}
                        </span>
                      </div>
                      <div
                        className="d-flex flex-column cursor align-items-center"
                        onClick={() => save(media)}
                      >
                        <AiFillClockCircle size="1.4rem" color="#fd0003" />
                        <span className="small text-center">
                          {present2
                            ? "Remove from watch later"
                            : "Save to watch later"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className="text-primary d-lg-none cursor"
                  onClick={() => setSeeAll(false)}
                >
                  See less
                </span>
              </div>
            </div>
          </div>

          <div className="position-relative">
            <span>Cast</span>
            {credits?.cast?.length > 0 ? (
              <div className="scroll-cast snaps scrollbody" ref={scrollRef}>
                {credits?.cast?.map((each, index) => (
                  <Link key={index} to={`/person/${each.id}`}>
                    <div className="inline-cast">
                      <Image
                        style={{ objectFit: "cover" }}
                        className="inline-cast"
                        src={
                          each.profile_path !== null
                            ? `https://image.tmdb.org/t/p/w500/${each.profile_path}`
                            : `https://www.freeiconspng.com/thumbs/person-icon/clipart--person-icon--cliparts-15.png`
                        }
                      />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p>No cast available</p>
            )}
            {credits?.cast?.length > 7 && <Arrow scroll={scroll} />}
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="mb-5 position-relative">
          <span>{videos?.results?.length > 1 ? "Videos" : "Video"}</span>
          {videos?.results?.length > 0 ? (
            <div className="scroll-video snaps scrollbody" ref={scrollRefB}>
              {videos?.results?.map((each, index) => (
                <div
                  onClick={() => {
                    setVideoIndex(index);
                    setShowVideo(true);
                  }}
                  key={index}
                  className="inline-video d-flex flex-column justify-content-center align-items-center"
                >
                  <p className="mb-0">
                    {each.name.length > 15
                      ? `${each.name?.slice(0, 15)}...`
                      : each.name}
                  </p>
                  <span className="small">
                    {each.type.length > 12
                      ? `${each.type?.slice(0, 15)}...`
                      : each.type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>No video available</p>
          )}

          {showVideo && (
            <VideoBox
              setVideoIndex={setVideoIndex}
              videoIndex={videoIndex}
              setShowVideo={setShowVideo}
              videos={videos}
            />
          )}
          {videos?.results.length > 5 && <Arrow scroll={scrollB} />}
        </div>

        <div className="mb-5 position-relative">
          <span>{images?.backdrops?.length > 1 ? "Images" : "Image"}</span>
          {images?.backdrops?.length > 0 ? (
            <div className="scroll-video snaps scrollbody" ref={scrollRefC}>
              {images?.backdrops?.map((each, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setImageIndex(index);
                    setShowImage(true);
                  }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${each.file_path}`}
                    className="inline-image"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No image available</p>
          )}

          {showImage && (
            <Imagebox
              setShowImage={setShowImage}
              imageIndex={imageIndex}
              images={images?.backdrops}
              setImageIndex={setImageIndex}
            />
          )}
          {images?.backdrops?.length > 5 && <Arrow scroll={scrollC} />}
        </div>

        <div>
          <Scroller
            mapped={recommendations?.results}
            data={"Recommendations"}
            url={runtime ? "/movie" : "/tv"}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieTvId;
