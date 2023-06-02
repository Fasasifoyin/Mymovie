import React from "react";
import useFetch from "../Hooks/useFetch";
import { Row, Col } from "react-bootstrap";
import MediaCard from "../components/MediaCard";
import PagesStart from "../components/PagesStart";
import Spinner from "../components/Spinner";

const NowPlaying = () => {
  const { data, fetching, error, lastMovie } = useFetch("movie/now_playing");

  return (
    <div className="text-white w-100 px-2 py-2">
      <PagesStart data={"Now Playing Movies"} />
      <Row className="gx-3 gy-4">
        {data.map((each, index) => (
          <Col
            xs={4}
            md={4}
            xl={2}
            key={index}
            ref={index === data.length - 1 ? lastMovie : null}
          >
            <MediaCard {...each} startpoint={"movie"} />
          </Col>
        ))}
      </Row>
      {fetching && <Spinner />}
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default NowPlaying;
