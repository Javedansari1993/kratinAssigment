import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow py-4">
      <div className="container">
        <h1 className="">Medical Management</h1>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li>
                  <Link
                    className="nav-link text-gray fw-bold fs-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link text-primary fw-bold fs-4"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link text-primary fw-bold fs-4"
                    to="/UserProfile"
                  >
                    UserProfile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-primary fw-bold fs-4"
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-primary fw-bold fs-4"
                    to="/"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
