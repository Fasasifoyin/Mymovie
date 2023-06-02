import React from "react";
import useFetch from "../Hooks/useFetch";
import { Row, Col } from "react-bootstrap";
import PersonCard from "../components/PersonCard";
import PagesStart from "../components/PagesStart";
import Spinner from "../components/Spinner";

const PopularPeople = () => {
  const { data, fetching, error, lastMovie } = useFetch("person/popular");

  return (
    <div className="text-white w-100 px-2 py-2">
      <PagesStart data={"Popular People"} />
      <Row className="gx-3 gy-4">
        {data.map((each, index) => (
          <Col
            xs={4}
            md={4}
            xl={2}
            key={index}
            ref={index === data.length - 1 ? lastMovie : null}
          >
            <PersonCard {...each} />
          </Col>
        ))}
      </Row>
      {fetching && <Spinner />}
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default PopularPeople;
