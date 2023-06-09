import React, {useEffect, useState} from "react";

import Header from "./components/header";
import Footer from "./components/footer"

import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "./components/dbconfig/dbconfig";
import {onAuthStateChanged} from "firebase/auth";

import "../src/index.css";
import {useNavigate} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
          const user = userCredential
          navigate("/paginautente")
          console.log(user)
        })
        .catch((err) => {
          const errCode = err.code;
          const errMessage = err.message;
          console.log(errCode, errMessage)
            setError(err.message)
        })
  };

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){
                const email = user.email
                console.log("email", email)
                navigate("/paginautente")
            }else{
                console.log("none")
            }
        })
    },[])

  return (
    <>
      <Header />
        <div className="error-reg-container">
            {error}
        </div>
      <div className="login-container" style={{ backgroundColor: "#F6F4E5" }}>
      <form onSubmit={handleSubmit}>
          <h2>Login </h2>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
             
              placeholder="Email"
            />
          </div>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
             
              placeholder="Password"
            /> </div>
          <button type="submit">Accedi</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Login;
