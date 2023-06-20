import Header from "./components/header";
import "../src/index.css";
import imgLeo from "../src/components/img/imgLeo.jpeg";
import Footer from "./components/footer";

function ArtistPage() {
  return (
    <>
      <Header />
      <div className="Leonardo-vinci">
        <div className="imm-leonardo">
          <img src={imgLeo}></img>
        </div>
        <div className="testo-leonardo" style={{ fontWeight: "bold" }}>
          <h1>Leonardo da Vinci</h1>
          <p>
            Leonardo da Vinci di ser Piero è stato uno scienziato, inventore e
            artista italiano. Uomo d'ingegno e talento universale del
            Rinascimento, considerato uno dei più grandi geni dell'umanità
          </p>
          <div className="button">
            <button>eventi a tema prossimi</button>
          </div>
        </div>
      </div>

      <div className="mostre-prossime">
        <div className="date">
          <h1 style={{ color: "#F45757" }}>2 mostre prossime</h1>

          <div className="mostre1">
            <p>
              Museo di Leonardo da Vinci - Aperto dal 07/08/2023 al 10/08/2023
            </p>
            <button>Acquisto biglietto</button>
          </div>
          <div className="mostre2">
            <p>
              Museo di Leonardo da Vinci - Aperto dal 18/10/2023 al 21/10/2023
            </p>
            <button>Acquisto biglietto</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ArtistPage;
