import React from "react";
import { NavLink } from "react-router-dom";

const Links = () => {
  return (
    <>
      <NavLink
        className="fs-lg-5"
        style={({ isActive }) => ({
          color: isActive ? "#fd0003" : "#d5d7d5",
          fontWeight: isActive ? "bold" : "",
        })}
        to="/"
      >
        <span>Home</span>
      </NavLink>
      <NavLink
        className="fs-lg-5"
        style={({ isActive }) => ({
          color: isActive ? "#fd0003" : "#d5d7d5",
          fontWeight: isActive ? "bold" : "",
        })}
        to="/movies"
      >
        <span>Movies</span>
      </NavLink>
      <NavLink
        className="fs-lg-5"
        style={({ isActive }) => ({
          color: isActive ? "#fd0003" : "#d5d7d5",
          fontWeight: isActive ? "bold" : "",
        })}
        to="/tvs"
      >
        <span>TVs</span>
      </NavLink>
      <NavLink
        className="fs-lg-5"
        style={({ isActive }) => ({
          color: isActive ? "#fd0003" : "#d5d7d5",
          fontWeight: isActive ? "bold" : "",
        })}
        to="/popularpeople"
      >
        <span>Popular People</span>
      </NavLink>
    </>
  );
};

export default Links;
