import React, { useState } from "react";

import Header from "./components/header";
import Footer from "./components/footer";

import "../src/index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberPasswordChange = (event) => {
    setRememberPassword(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Effettua l'elaborazione del login qui utilizzando email, password e rememberPassword
  };

  return (
    <>
      <Header />

      <div className="login-container" style={{ backgroundColor: "#F6F4E5" }}>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <button type="submit">Accedi</button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Login;
