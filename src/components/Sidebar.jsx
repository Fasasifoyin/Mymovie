import React from "react";
import useFetchHook from "../Hooks/useFetchHook";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Sidebar = ({ setShow, show }) => {
  const { genres } = useFetchHook("genre/movie/list");

  return (
    <Container>
      <div className="w-100 text-white py-3 py-lg-0">
        {genres.map((each) => (
          <NavLink
            to={`/movie/genres/${each.id}`}
            key={each.id}
            style={({ isActive }) => ({
              color: isActive ? "#fd0003" : "#d5d7d5",
              fontWeight: isActive ? "bold" : "",
            })}
             onClick={() => show && setShow(false)}
          >
            <p>{each.name}</p>
          </NavLink>
        ))}
      </div>
    </Container>
  );
};

export default Sidebar;
