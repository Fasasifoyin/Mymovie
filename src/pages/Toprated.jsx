import React from "react";
import useFetch from "../Hooks/useFetch";
import { Row, Col } from "react-bootstrap";
import MediaCard from "../components/MediaCard";
import PagesStart from "../components/PagesStart";
import Spinner from "../components/Spinner";

const Toprated = () => {
  const { data, fetching, data2, lastMovie } = useFetch("movie/top_rated");
  const allData = [...data2, ...data];

  return (
    <div className="text-white w-100 px-2 py-2">
      <PagesStart data={"Top Rated Movies"} />
      {fetching && <Spinner />}
      <Row className="gx-3 gy-4">
        {allData.map((each, index) => (
          <Col
            xs={4}
            md={4}
            xl={2}
            key={index}
            ref={index === allData.length - 1 ? lastMovie : null}
          >
            <MediaCard {...each} startpoint={"movie"} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Toprated;
