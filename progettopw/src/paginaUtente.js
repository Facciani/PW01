import Header from "./components/header";
import Footer from "./components/footer";
import "../src/index.css";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./components/dbconfig/dbconfig";
import {useNavigate} from "react-router-dom";

import Avatar from "../src/components/img/Avatar.jpeg";
import PWfoto from "../src/components/img/PWfoto.jpeg";
import PWfoto2 from "../src/components/img/PWfoto2.jpeg";
import PWfoto3 from "../src/components/img/PWfoto3.jpeg";

const PaginaUtente = () => {

    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){
                const email = user.email
                console.log("email", email)
            }else{
                console.log("none")
                navigate("/login")
            }
        })
    },[])

    return (
<>
  <Header />

  <div className="info-containerBello">
  <div className="left-columnU">
    <img src={Avatar} className="centered-imageU"></img>
  </div>
  <div className="right-columnU">
    <h3>Informazioni</h3>
    <div className="cardU1 mini-divciao">
      <p>Utente registrato dal 01/02/2023</p>
      <p><b>E-mail: </b>maggi@03gmail.com</p>
      <p><b>Nome Utente: </b>Maggi Andrea</p>
    </div>
  </div>

</div>
    <div className="mini-divciao">
        <h1 >Biglietti recenti acquistati</h1>
    </div>
    

  <div className="card-containerU">
    <div className="cardU">
      <h1>Uffizi</h1>
      <p><b>Biglietto MULTIPLO X2</b> </p>
      <p><b>Costo:</b> 50€</p>
      <p><b>Data acquisto:</b> 07/06/2023</p>
      <p><b>Metodo di pagamento:</b><br></br> PayPal </p>
    </div>
    <div className="cardU">
    <h1>Giardino di Boboli</h1>
    <p><b>Biglietto singolo</b> </p>
      <p><b>Costo:</b> 16€</p>
      <p><b>Data acquisto:</b> 07/06/2023</p>
      <p><b>Metodo di pagamento:</b> Samsung Pay </p>
    </div>
    <div className="cardU">
    <h1>Palazzo Pitti</h1>
    <p><b>Biglietto MULTIPLO X2</b> </p>
      <p><b>Costo:</b> 32€</p>
      <p><b>Data acquisto:</b> 27/01/2023</p>
      <p><b>Metodo di pagamento:</b><br></br> Carta di Credito </p>
    </div>
  </div>
    <div className="mini-divciao">
        <h1>musei preferiti preferiti</h1>
    </div>

    <div className="card-containerU">
    <div className="cardU">
      <h1>Museo egizio</h1>
      <img src={PWfoto}></img>
    </div>
    <div className="cardU">
    <h1>Uffizi</h1>
    <img src={PWfoto2}></img>
    </div>
    <div className="cardU">
    <h1>Palazzo Pitti</h1>
    <img src={PWfoto3}></img>
    </div>
  </div>
  <div className="mini-divciao">
  <h1>La tua attivita recente</h1>
    </div>

  <div className="info-containerBelloU2">
  <div class="left-section scrollable-container">
    <div class="scrollable-content">
      <p><b>28/04/2023</b></p>
      <p><b>Hai commentato: </b> Gli uffizi sono davvero fantastici! bella esperienza.</p>
      <p><b>25/04/2023</b></p>
      <p><b>Hai risposto a AleRicci01: </b> Ciao! il museo è attrezzato di un area ristoro per i visitatori, non occorre allontanarsi molto.</p>
      <p><b>22/04/2023</b></p>
      <p><b>Hai commentato: </b> Il museo egizio sempre bello.</p>
      <p><b>21/04/2023</b></p>
      <p><b>Hai commentato: </b> Visita consigliata, soprattutto in compagnia</p>
      <p><b>15/04/2023</b></p>
      <p><b>Hai messo like al commento di: AleFacc</b> </p>
      <p><b>11/04/2023</b></p>
      <p><b>Hai commentato: </b> Audio guida molto chiara. Non molto affollato, esperienza consigliata</p>
      <p><b>06/04/2023</b></p>
      <p><b>Hai commentato: </b> Gli uffizi sono davvero fantastici! bella esperienza.</p>
      <p><b>01/04/2023</b></p>
      <p><b>Hai messo like al commento di: Giacomo_Barza </b> </p>
    </div>
  </div>
  <div class="rectangleU1">
  <div class="right-sectionU2">
    <h3>Info commenti</h3>
    <p><b>commenti scritti:</b> 15</p>
    <p><b>segnalazioni inviate:</b> 3</p>
    <h3>Like inviati</h3>
    <p><b>commenti scritti:</b> 15</p>
  </div>
</div>
</div>


  <Footer />
</>
      );
}

export default PaginaUtente