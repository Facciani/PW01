import React, {useEffect, useState} from "react";

import Header from "./components/header";
import Footer from "./components/footer";

import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

import{auth} from "./components/dbconfig/dbconfig";

import "../src/index.css";
import {useNavigate} from "react-router-dom";

const Registry = () => {

  const navigate = useNavigate()

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [rememberPasswordChecked, setRememberPasswordChecked] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleTermsCheckedChange = () => {
    setTermsChecked(!termsChecked);
  };

  const handleEmailCheckedChange = () => {
    setEmailChecked(!emailChecked);
  };

  const handleRememberPasswordCheckedChange = () => {
    setRememberPasswordChecked(!rememberPasswordChecked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      setError("Le due password non corrispondono")
    }else{
      await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
            navigate('/login')
          })
          .catch((err) => {
            const errCode = err.code
            const errMessage = err.message
            console.log(errCode, errMessage)
            setError(errMessage)
          })
    }
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
      <div className="registration-container" style={{ marginTop: "50px", marginBottom: "50px" }}>
        <form onSubmit={handleSubmit}>
          <h2>Registrazione</h2>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              style={{ width: "200px", border: "2px solid", padding: "10px", borderWidth: "2px" }}
              placeholder="Email"
            />
          </div>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              style={{ width: "200px", border: "2px solid", padding: "10px", borderWidth: "2px" }}
              placeholder="Password"
            />
          </div>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              style={{ width: "200px", border: "2px solid", padding: "10px", borderWidth: "2px" }}
              placeholder="Ripeti password"
            />
          </div>
          <div className="checkbox-group">
          <label>
              <input
                type="checkbox"
                checked={termsChecked}
                onChange={handleTermsCheckedChange}
                required
              />
              Termini e Condizioni
            </label>
            <label>
              <input
                type="checkbox"
                checked={emailChecked}
                onChange={handleEmailCheckedChange}
              />
              Inviami email
            </label>
            <label>
              <input
                type="checkbox"
                checked={rememberPasswordChecked}
                onChange={handleRememberPasswordCheckedChange}
              />
              Ricorda password
            </label>
          </div>
          
          <button type="submit">Registrati</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Registry;
