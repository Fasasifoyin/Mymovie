import React, { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import Drawer from "./Drawer";
import { FaSearch } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { GoThreeBars } from "react-icons/go";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [show]);

  return (
    <div
      className="position-fixed top-0 left-0 w-100 bg-dark"
      style={{ height: "70px", zIndex: "15" }}
    >
      <Container className="h-100">
        <div className="w-100 h-100 d-flex justify-content-between align-items-center">
          <Link to="/">
            <div
              style={{
                width: "50px",
                height: "40px",
                boxShadow: "2px 2px 3px crimson",
              }}
            >
              <Image
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
                src="https://static.rfstat.com/renderforest/images/v2/landing-pics/logo-animation/editable-spinning.png"
              />
            </div>
          </Link>

          <div>
            <div className="d-lg-none">
              {!showInput && (
                <FaSearch
                  className="cursor"
                  size="1.2rem"
                  color="white"
                  onClick={() => setShowInput(true)}
                />
              )}
              {showInput && (
                <>
                  <div className="position-relative">
                    <input
                      type="text"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <MdOutlineCancel
                      onClick={() => {
                        setShowInput(false);
                        setSearch("");
                      }}
                      size="1.3rem"
                      color="white"
                      className="cursor position-absolute top-50 translate-middle-y"
                      style={{ right: "1%" }}
                    />
                    {search.length && (
                      <SearchBox search={search} setSearch={setSearch} />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="d-none d-lg-block position-relative">
            <input
              type="text"
              placeholder="Search Movies, TVs & People"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <MdOutlineCancel
              onClick={() => setSearch("")}
              size="1.3rem"
              color="white"
              className="cursor position-absolute top-50 translate-middle-y"
              style={{ right: "1%" }}
            />
            {search.length && (
              <SearchBox search={search} setSearch={setSearch} />
            )}
          </div>
          <div className="d-lg-none cursor" onClick={() => setShow(true)}>
            <GoThreeBars color="blue" size="1.6rem" />
          </div>
        </div>
      </Container>
      {show && <Drawer setShow={setShow} show={show}/>}
    </div>
  );
};

export default Navbar;
