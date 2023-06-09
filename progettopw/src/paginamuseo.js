import React, { useState } from "react";

import Header from "./components/header";
//import Suggest from "./components/suggestt";
import Footer from "./components/footer";
import uffizi from "./components/img/uffizi.jpeg";
import "../src/index.css";

function MuseumPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300/?blur",
    "https://picsum.photos/200/300.jpg",
  ];

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <Header />
      <div className="carosello-container">
        <button className="previous-button" onClick={previousImage}>
          &lt;
        </button>
        <img
          className="carousel-image background-left"
          src={
            images[
              currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
            ]
          }
          alt="Carousel"
        />
        <img
          className="carousel-image foreground"
          src={images[currentImageIndex]}
          alt="Carousel"
        />
        <img
          className="carousel-image background-right"
          src={
            images[
              currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
            ]
          }
          alt="Carousel"
        />
        <button className="next-button" onClick={nextImage}>
          &gt;
        </button>
      </div>
      <div className="content-container">
        <div className="left-content">
          <h1>Galleria Uffizi</h1>
          <p >Piazzale degli Uffizi, 6 055 294883</p>
          <h3>Uffizi e boboli gratis il 4/09/2023</h3>
          <p>Ingresso singolo al Giardino di Boboli.
            Con il biglietto del Giardino di Boboli è possibile accedere
            gratuitamente al Giardino di Villa Bardini.</p>
          <h3>L’incontro con la grande arte d’Occidente. </h3>
          <p>La collezione abbellisce i corridoi della Galleria
             e comprende sculture romane antiche,copie da originali greci andati perduti.</p>
          <h3>Florentine Cultural Weekend</h3>
          <p>Tour privato degli Uffizi con il direttore SchmidtCene 
            esclusive,visite a palazzo e altro ancora.</p>
            <h3>Ciclo di conferenze presso l'Auditorium Vasari degli Uffizi. <br></br>ogni mercoledì alle ore 17.00</h3>
            <p>Da Dante alla Cina, da Mantegna all’India, dall’archeologia al teatro e dalla letteratura alla storia dell’arte 
              e alle scienze naturali: <br></br>mercoledì 14 settembre (ore 17) ripartono,
             all’insegna della varietà tematica che da sempre li contraddistingue,<br></br>
              i Dialoghi d’Arte e Cultura, ovvero i cicli di conferenze organizzati dalle Gallerie 
              degli Uffizi.</p> <br></br>
        </div>
        <div className="right-content">
        <div className="right-interno">
          <p style={{ fontWeight: "bold", fontSize: "19px" }}>Prenota un biglietto</p>
           <button type="submit">Prenota</button>
        </div>
         
       </div>
      </div>
      <div className="containerImmagini">
      <p >ciao</p>
      <div className="image-container">
       </div>
      </div>
       
      <Footer />
    </>
  );
}

export default MuseumPage;
