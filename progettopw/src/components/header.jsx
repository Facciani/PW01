import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar">
      {/* <img src="src\components\img\logo.jpeg" /> */}
      <button id="navi">
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={"/registration"}
        >
          Registrati
        </Link>
      </button>
      <button id="navi">
        <Link style={{ textDecoration: "none", color: "white" }} to={"/login"}>
          Login
        </Link>
      </button>
    </nav>
  );
};

export default Header;
