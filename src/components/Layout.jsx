import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Link, Outlet } from "react-router-dom";
import LargeOpt from "./LargeOpt";
import SmallOpt from "./SmallOpt";

const Layout = () => {
  return (
    <>
      <Navbar />
      <SmallOpt />

      <div className="d-flex" style={{ marginTop: "70px" }}>
        <div
          className="d-none d-lg-block"
          style={{
            height: "calc(100vh - 70px)",
            width: "200px",
          }}
        >
          <div
            className="position-fixed start-0 scrollbody overflow-scroll py-2"
            style={{
              height: "calc(100vh - 70px)",
              width: "200px",
              backgroundColor: "rgb(104,18,0)",
            }}
          >
            <div className="d-none d-lg-flex flex-column gap-2 mb-3">
              <Link className="text-white px-2" to='/favorites'>
                <span>Favorites</span>
              </Link>
              <Link className="text-white px-2" to='/watchlater'>
                <span>Watch Later</span>
              </Link>
            </div>
            <div className="w-100 text-center mb-0">
              <span className="fs-5 fw-bold text-warning">Genres</span>
            </div>
            <Sidebar />
          </div>
        </div>

        <div className="outlet py-lg-0">
          <LargeOpt />

          <div className="pt-lg-5 seeDown">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
