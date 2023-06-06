import React from "react";
import logo from "./img/logo.jpeg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column footer-column-large">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p>
            Il miglior sito italiano in cui trovare mostre e musei in base alla
            zona desiderata. Potrai trovare tutte le informazioni desiderate e
            comprare i biglietti desiderati.
          </p>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul>
            <li>Via Benigno crespi, 30</li>
            <li>Via Benigno crespi, 30</li>
            <li>20159 Milano (MI)</li>
            <li>+39 2424175393</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Social</h3>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Linkedin</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
