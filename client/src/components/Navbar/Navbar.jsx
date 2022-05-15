import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props, { loggedInUser }) => {
  const { isLoggedIn } = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/">
        <button className="btn btn-outline-dark btn-sm btn-floating">
          Home
        </button>
      </Link>
      {isLoggedIn ? (
        <Link to="/user">
          <button className="nav">Profile</button>
        </Link>
      ) : (
        ""
      )}
      {isLoggedIn ? (
        <Link to="/activities">
          <button className="btn btn-outline-dark btn-sm btn-floating">
            Activities
          </button>
        </Link>
      ) : (
        ""
      )}

      {isLoggedIn ? (
        <span className="navbar-heading">
          Welcome, {props.currentUser.name}
        </span>
      ) : (
        <Link to="/login">
          <button className="btn btn-outline-dark btn-sm btn-floating">
            Login
          </button>
        </Link>
      )}

      {isLoggedIn ? (
        <button
          className="btn btn-outline-dark btn-sm btn-floating"
          type="button"
          onClick={props.logoutHandler}
        >
          Logout
        </button>
      ) : (
        <Link to="/signup">
          <button className="btn btn-outline-dark btn-sm btn-floating">
            Sign Up
          </button>{" "}
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
