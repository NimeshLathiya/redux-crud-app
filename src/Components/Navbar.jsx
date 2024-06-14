import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../Features/UserDetailSlice";

const Navbar = () => {
  const allUser = useSelector((state) => state.app.users);
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData, dispatch]);

  return (
    <>
      <div className="">
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark py-2">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Redux Crud
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav w-25  me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to="/createpost"
                  >
                    Create Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/read">
                    All Post
                    <Badge
                      badgeContent={allUser.length}
                      color="primary"
                      className="ms-2 pb-4"
                    ></Badge>
                  </Link>
                </li>
              </ul>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
