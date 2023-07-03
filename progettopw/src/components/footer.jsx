import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faNomeIcona } from "@fortawesome/free-solid-svg-icons"; 
import logo from "./img/logo.jpeg";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas);

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column footer-column-large">
          <img src={logo} alt="Logo" className="footer-logo" />
          <p><b>           Il miglior sito italiano in cui trovare mostre e musei in base alla
            zona desiderata. Potrai trovare tutte le informazioni desiderate e
            comprare i biglietti desiderati.</b>
 
          </p>
        </div>
        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul>
            <li>Via Benigno crespi, 30</li>
            <li>20159 Milano (MI)</li>
            <li>+39 2424175393</li>
          </ul>
        </div>
        <div className="footer-column">
  <h3>Social</h3>
  <ul>
    <li><FontAwesomeIcon icon={faInstagram} className="social-icon" />MuseumArtDiscover_</li>
    <li><FontAwesomeIcon icon={faFacebook} className="social-icon" />MuseumArtDiscover_official</li>
    <li><FontAwesomeIcon icon={faTwitter} className="social-icon" />MuseumArtDiscover</li>
  </ul>
</div>
      </div>
      <p>© 2023 MuseumArtDiscover.</p>
    </footer>
  );
}

export default Footer;