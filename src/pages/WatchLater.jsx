import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import MediaCard from "../components/MediaCard";
import PagesStart from "../components/PagesStart";
import { useStateContext } from "../Library/Context";

const WatchLater = () => {
  const { watch, setWatch } = useStateContext();

  const remove = (id) => {
    const exist = watch.find((each) => each.id === id);
    exist && setWatch(watch.filter((each) => each.id !== id));
  };

  return (
    <div className="text-white w-100 py-2 px-2">
      <PagesStart data={"Watch Later"} />
      {watch.length > 0 ? (
        <Row className="gx-3 gy-5">
          {watch?.map((each) => (
            <Col xs={4} md={4} xl={2} key={each.id}>
              <MediaCard
                {...each}
                startpoint={each?.runtime ? "movie" : "tv"}
              />
              <div className="text-center">
                <Button
                  className="border border-none"
                  style={{ backgroundColor: "#fd0003" }}
                  size="sm"
                  onClick={() => remove(each.id)}
                >
                  Remove
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <h4>You have not added anything to your watch later list</h4>
      )}
    </div>
  );
};

export default WatchLater;
