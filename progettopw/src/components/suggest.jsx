import React from "react";
import prova from "../components/img/prova.jpeg";
import PWfoto from "../components/img/PWfoto.jpeg";
import PWfoto2 from "../components/img/PWfoto2.jpeg";
import PWfoto3 from "../components/img/PWfoto3.jpeg";

function Suggest() {
  return (
    <div class="container">
      <h1 class="heading">Gli altri utenti suggeriscono anche...</h1>
      <p style={{ fontSize: "1.4em" }} class="heading">
        Gli altri utenti ti suggeriscono anche
        <br />
        la lista di musei che trovi qua sotto
      </p>

      <div class="card-container">
        <div class="card">
          <div class="top-section">
            <img src={PWfoto}></img>
          </div>
          <div class="bottom-section">
            <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>
              Museo Egizio
            </p>
            <br></br>
            <p style={{ fontWeight: "bold" }}>
              Il Museo Egizio è il più antico museo del mondo dedicato
              interamente alla cultura egizia.
            </p>
            <button class="BottoneDettagli">Dettagli</button>
            <button class="BottoneSave">Salva tra i preferiti</button>
          </div>
        </div>

        <div class="card">
          <div class="top-section">
            <img src={PWfoto2}></img>
          </div>
          <div class="bottom-section">
            <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>
              Palazzo Vecchio
            </p>
            <br></br>
            <p style={{ fontWeight: "bold" }}>
              Rappresenta la migliore sintesi dell'architettura civile
              trecentesca cittadina ed è uno dei palazzi più conosciuti.
            </p>
            <button class="BottoneDettagli">Dettagli</button>
            <button class="BottoneSave">Salva tra i preferiti</button>
          </div>
        </div>

        <div class="card">
          <div class="top-section">
            <img src={PWfoto3}></img>
          </div>
          <div class="bottom-section">
            <p style={{ fontWeight: "bold", fontSize: "1.1em" }}>
              Galleria dell’Accademia, Firenze
            </p>
            <br></br>
            <p style={{ fontWeight: "bold" }}>
              Un percorso storico e artisticoche da più di due secoli racconta
              Firenze attraverso i suoi grandi capolavori.
            </p>
            <button class="BottoneDettagli">Dettagli</button>
            <button class="BottoneSave">Salva tra i preferiti</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Suggest;
