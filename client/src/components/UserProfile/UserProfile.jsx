import React from "react";
import "./UserProfile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import photo from "./profile-photo.png";

export default function UserProfile(props) {
  console.log(props);
  const { loggedInUser } = props;

  return (
    <div>
      <Navbar isLoggedIn={!!loggedInUser}></Navbar>
      <Header />

      <div className="card">
        <center>
          <h2>
            {props.loggedInUser.name}
            <br />
            <small>Berlin</small>
          </h2>

          <img className="profile-photo" src={photo} />
        </center>
        <center>
          <span>
            <strong>Activities: </strong>
          </span>
          <span className="badge bg-primary">Outdoor</span>
          <span className="badge bg-secondary">Mechanics</span>
          <span className="badge bg-success">Mindfulness</span>
          <span className="badge bg-danger">Adventure</span>
          <span className="badge bg-dark">Coding</span>
        </center>
        <hr />
        <p class="text-left">
          <strong>Bio: </strong>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sem dui,
          tempor sit amet commodo a, vulputate vel tellus.
        </p>
      </div>
    </div>
  );
}