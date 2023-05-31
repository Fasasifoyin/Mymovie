import React from "react";
import { BiArrowBack } from "react-icons/bi";
import Sidebar from "./Sidebar";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom'

const Drawer = ({ setShow, show }) => {
  return (
    <div className="drawer bg-dark">
      <div className="d-flex justify-content-between align-items-center px-4 py-3">
        <BiArrowBack
          className="cursor"
          onClick={() => setShow(false)}
          color="white"
          size="1.4rem"
        />
      </div>
      <Container className="d-flex flex-column gap-2">
        <Link className="text-white cursor" to='/favorites'>
        <span onClick={() => setShow(false)}>Favorites</span>
        </Link>
        <Link className="text-white cursor" to='/watchlater'>
        <span onClick={() => setShow(false)}>Watch Later</span>
        </Link>
      </Container>
      <div className="text-center" style={{ color: "#fd0003" }}>
        <span className="fs-5 fw-bold">Genre</span>
      </div>

      <div className="drawer-genre scrollbody">
        <Sidebar setShow={setShow} show={show} />
      </div>
    </div>
  );
};

export default Drawer;
