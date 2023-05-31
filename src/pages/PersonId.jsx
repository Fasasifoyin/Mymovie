import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, API_KEY } from "../api/config";
import axios from "axios";
import { Image } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Scroller from "../components/scroller";
import Imagebox from "../components/Imagebox";
import Arrow from "../components/Arrow";

const PersonId = () => {
  const { person_id } = useParams();
  const navigate = useNavigate();
  const scrollRefC = useRef();
  const [person, setPerson] = useState({});
  const [seeAll, setSeeAll] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageIndex, setImageIndex] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/person/${person_id}?api_key=${API_KEY}&append_to_response=images,movie_credits`
        );
        setPerson(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [person_id]);

  const scrollC = (direction) => {
    const { current } = scrollRefC;
    direction === "left"
      ? (current.scrollLeft -= 500)
      : (current.scrollLeft += 500);
  };

  const {
    biography,
    birthday,
    gender,
    images,
    known_for_department,
    movie_credits,
    name,
    place_of_birth,
    profile_path,
  } = person;

  return (
    <div className="w-100 text-white mb-3">
      <div
        className="d-lg-none position-relative md-image bg-grey"
        style={{ width: "100%" }}
      >
        <Image
          style={{ objectFit: "cover" }}
          className="w-100 h-100"
          src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
        />
        <div
          className="position-absolute px-2 py-1 w-100"
          style={{ bottom: "0px", background: "rgb(27, 27, 27, 0.5)" }}
        >
          <div>
            <span className="fs-5">{name}</span>
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

      <div className="mb-3 position-relative">
        <div className="d-none d-lg-block position-absolute top-0 left-0 w-100 h-100">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
            className="w-100 h-100"
            style={{ objectFit: "cover", opacity: "0.1" }}
          />
        </div>

        <div className="position-relative px-2 py-2" style={{ zIndex: "8" }}>
          <div className="d-lg-flex gap-2">
            <div
              className="d-none d-lg-block"
              style={{ width: "270px", height: "400px" }}
            >
              <Image
                style={{ objectFit: "cover", width: "270px", height: "400px" }}
                src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
              />
            </div>
            <div className="d-flex flex-column gap-3 w-100">
              <div className="d-none d-lg-block mb-0">
                <h3 className="mb-0" style={{ color: "#ffa101" }}>
                  {name}
                </h3>
              </div>
              <div className="mb-0">
                <h5 className="mb-0">Gender</h5>
                <span className="small">
                  {gender === 1 ? "Female" : "Male"}
                </span>
              </div>
              <div className="mb-0">
                <h5 className="mb-0">D.O.B</h5>
                <span className="small">{birthday}</span>
              </div>
              <div className="mb-0">
                <h5 className="mb-0">Place of birth</h5>
                <span className="small">
                  {place_of_birth}{" "}
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
                <div className="mb-0">
                  <h5 className="mb-0">Department</h5>
                  <span className="small">{known_for_department}</span>
                </div>
                <div className="mb-0">
                  <h5 className="mb-0">Biography</h5>
                  {biography?.split("\n\n").map((paragraph, index) => (
                    <p className="mb-0 text-break small" key={index}>
                      {paragraph
                        ?.split("\n")
                        ?.reduce((total, line) => [total, <br />, line])}
                    </p>
                  ))}
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
        </div>
      </div>
      <div className="px-2 py-3">
        <div className="mb-5 position-relative">
          <span>{images?.profiles?.length > 1 ? "Images" : "Image"}</span>
          {images?.profiles?.length > 0 ? (
            <div className="scroll-video snaps scrollbody" ref={scrollRefC}>
              {images?.profiles?.map((each, index) => (
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
                    style={{objectFit:'cover'}}
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
              images={images?.profiles}
              setImageIndex={setImageIndex}
            />
          )}
          {images?.profiles?.length > 5 && <Arrow scroll={scrollC} />}
        </div>

        <div>
          <Scroller
            mapped={movie_credits?.cast}
            data={"Recommendations"}
            url={"/movie"}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonId;
