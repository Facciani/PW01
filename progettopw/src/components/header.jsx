import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar">
      <button>
        <Link to={"registration"}>Registrati</Link>
      </button>
      <button>
        <Link to={"login"}>Login</Link>
      </button>
    </nav>
  );
};

export default Header;
