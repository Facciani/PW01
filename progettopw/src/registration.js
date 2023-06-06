import React, { useState } from "react";

import Header from "./components/header";
import Footer from "./components/footer";

import "../src/index.css";

const Registry = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Esegui l'elaborazione della registrazione qui utilizzando i dati inseriti
  };

  return (
    <>
      <Header />

      <div className="registration-container">
        <form onSubmit={handleSubmit}>
          <h2>Registrazione</h2>
          <div className="formreg-group">
            <label>Nome:</label>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cognome:</label>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Ripeti Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
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
          </div>
          <button type="submit">Registrati</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Registry;
