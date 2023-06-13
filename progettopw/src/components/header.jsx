import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import logo from "./img/logo.jpeg";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "./dbconfig/dbconfig";

const Header = () => {
  const[logged, setLogged] = useState(false)

  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if(user){
        const email = user.email
        console.log("email", email)
        setLogged(true)
      }else{
        console.log("none")
      }
    })
  },[])

  const logout = () => {
    signOut(auth).then(() => {
      console.log("Logout successfully")
      navigate("/login")
    }).catch((error) => {
      console.log(error.code, error.message)
    });
  }

  return (
    <nav>
      <div className="left-section">
        <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
          {" "}
          <img src={logo} className="logonav" alt="logo" />
        </Link>
      </div>
      <div className="right-section">
        {!logged ?
            <>
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
            </>
          :
            <>
            <button onClick={() => logout()}>
                Logout
            </button>
            <button>
              <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={"/paginautente"}
              >
                Utente
              </Link>
            </button>
            </>
        }

      </div>
    </nav>
  );
};

export default Header;
