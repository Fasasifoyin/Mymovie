import React from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { ImCancelCircle } from "react-icons/im";

const Box = ({ children, index, setIndex, setShow, length }) => {
  const goRight = () => {
    setIndex(index < length - 1 ? index + 1 : 0);
  };

  const goLeft = () => {
    setIndex(index !== 0 ? index - 1 : length - 1);
  };

  return (
    <div className="modalbox">
      <div className="modalbox2" />
      <div className="contentbox">
        <div className="position-relative w-100 h-100 d-flex justify-content-center align-items-center">
          <div style={{ width: "100%", maxWidth: "600px", height: "60%" }}>
            {children}
          </div>
          <HiArrowCircleLeft
            onClick={goLeft}
            size="2rem"
            className="cursor position-absolute start-0 top-50 translate-middle-y"
          />
          <HiArrowCircleRight
            onClick={goRight}
            size="2rem"
            className="cursor position-absolute end-0 top-50 translate-middle-y"
          />
          <ImCancelCircle
            onClick={() => setShow(false)}
            size="1.5rem"
            className="position-absolute cursor"
            style={{ top: "20px", right: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Box;
