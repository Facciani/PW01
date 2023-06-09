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
  const [rememberPasswordChecked, setRememberPasswordChecked] = useState(false);

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

  const handleRememberPasswordCheckedChange = () => {
    setRememberPasswordChecked(!rememberPasswordChecked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Esegui l'elaborazione della registrazione qui utilizzando i dati inseriti
  };

  return (
    <>
      <Header />

      <div className="registration-container" style={{ marginTop: "50px", marginBottom: "50px" }}>
        <form onSubmit={handleSubmit}>
          <h2>Registrazione</h2>
          <div className="formreg-group" style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              required
              style={{ width: "200px", border: "2px solid", padding: "10px", borderWidth: "2px" }}
              placeholder="Inserisci il nome"
            />
          </div>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              required
              style={{ width: "200px", border: "2px solid", padding: "10px", borderWidth: "2px" }}
              placeholder="Inserisci il cognome"
            />
          </div>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              style={{ width: "200px", border: "2px solid", padding: "10px", borderWidth: "2px" }}
              placeholder="Inserisci l'email"
            />
          </div>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              style={{ width: "200px", border: "2px solid", padding: "10px", borderWidth: "2px" }}
              placeholder="Inserisci la password"
            />
          </div>
          <div className="form-group" style={{ marginBottom: "10px" }}>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              style={{ width: "200px", border: "2px solid", padding: "10px", borderWidth: "2px" }}
              placeholder="Ripeti la password"
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
