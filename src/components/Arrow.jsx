import React from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

const Arrow = ({scroll}) => {
  return (
    <>
      <IoMdArrowDropleftCircle
        onClick={() => scroll("left")}
        size="1.5rem"
        className="cursor position-absolute top-50 start-0 translate-middle-y d-none d-lg-block"
      />
      <IoMdArrowDroprightCircle
        onClick={() => scroll("right")}
        size="1.5rem"
        className="cursor position-absolute top-50 end-0 translate-middle-y d-none d-lg-block"
      />
    </>
  );
};

export default Arrow;
