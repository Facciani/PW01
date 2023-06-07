import React from "react";
import { Link } from "react-router-dom";
import logo from "./img/logo.jpeg";

const Header = () => {
  return (
    <nav>
      <div className="left-section">
        <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
          {" "}
          <img src={logo} className="logonav" alt="logo" />
        </Link>
      </div>
      <div className="right-section">
        <button>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/registration"}
          >
            Registrati
          </Link>
        </button>
        <button>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={"/login"}
          >
            Login
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Header;
