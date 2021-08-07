import React from "react";
import { Link } from "react-router-dom";

NavBar.propTypes = {};

function NavBar(props) {
  return (
    <div>
      <ul style={{display: "flex", justifyContent: "space-evenly"}}>
        <li>
          <Link to="/todo">Todo </Link>
        </li>
        <li>
          <Link to="/covid">Covid </Link>
        </li>
        <li>
          <a href="https://music.tcplong.me">Music</a>
        </li>
        <li>
          <Link to="/timer"> Timer</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
