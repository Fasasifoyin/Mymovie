import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const PagesStart = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <BiArrowBack
        onClick={() => navigate(-1)}
        size="1.5rem"
        className="d-lg-none cursor"
      />
      <span className="fw-bold fs-4" style={{ color: "#ffa101" }}>
        {data}
      </span>
      <div className="d-lg-none" />
    </div>
  );
};

export default PagesStart;
