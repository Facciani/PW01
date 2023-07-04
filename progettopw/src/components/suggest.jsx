import React from "react";
import Foto1 from "../components/img/Foto1.jpeg";
import millu from "../components/img/Foto3.jpeg";
import foto3 from "../components/img/11.jpg";

function Suggest() {
  return (
    <div class="container">
      <h2 class="heading">Gli altri utenti suggeriscono anche...</h2>
      <p style={{ fontSize: "1.1em" }} class="heading">
        Gli altri utenti ti suggeriscono anche
        <br />
        la lista di musei che trovi qua sotto
      </p>

      <div class="card-container">
        <div class="card">
          <div class="top-section">
            <img src={Foto1}></img>
          </div>
          <div class="bottom-section">
            <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>
            Museo Civico di Storia Naturale di Milano
            </p>
            <br></br>
            <div class="padding">
            <p style={{ fontWeight: "bold" }}>
            Edificio del XIX secolo in cui sono esposti minerali, fossili, scheletri e animali imbalsamati.
            </p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="top-section">
            <img src={millu}></img>
          </div>
          <div class="bottom-section">
            <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>
            Museo delle illusioni
            </p>
            <br></br>
            <p style={{ fontWeight: "bold" }}>
            Museo per famiglie dedicato alle illusioni ottiche, con mostre di ologrammi e specchi.
            </p>
          </div>
        </div>

        <div class="card">
          <div class="top-section">
            <img src={foto3}></img>
          </div>
          <div class="bottom-section">
            <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>
              Museo Civico Medievale
            </p>
            <br></br>
            <p style={{ fontWeight: "bold" }}>
            Museo ospitato in un palazzo del XV secolo con collezioni di bronzi, armature e libri liturgici medievali.
            </p>

            </div>
          </div>
        </div>
      </div>
  );
}

export default Suggest;
