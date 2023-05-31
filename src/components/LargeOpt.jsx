import React, { useState } from "react";
import Links from "./Links";
import { useNavigate } from "react-router-dom";

const LargeOpt = () => {
  const [color, setColor] = useState(false);
  const navigate = useNavigate();

  const changeColor = () => {
    if (window.scrollY > 50) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div
      className="position-fixed d-none d-lg-block"
      style={{ width: "calc(100% - 200px)", zIndex: "10" }}
    >
      <div
        className={
          color
            ? "d-flex py-2 px-2 justify-content-between align-items-center gap-5 bg-dark"
            : "d-flex py-2 px-2 justify-content-between align-items-center gap-5"
        }
      >
        <div />
        <div className="d-flex align-items-center gap-5">
          <Links />
        </div>
        <span
          className="text-primary cursor fw-bold"
          onClick={() => navigate(-1)}
        >
          Back
        </span>
      </div>
    </div>
  );
};

export default LargeOpt;
