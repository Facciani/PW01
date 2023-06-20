import React, {useContext, useEffect, useState} from "react";

import Header from "./components/header";
//import Suggest from "./components/suggestt";
import Footer from "./components/footer";
import uffizi from "./components/img/uffizi.jpeg";
import "../src/index.css";
import {GetSpecificMuseo, GetMuseoIMG} from "./components/crud/crudMuseo";
import {IdMuseoContext} from "./components/context/idMuseoContext";



function MuseumPage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { idMuseo, setIdMuseo } = useContext(IdMuseoContext);

    useEffect(()=>{
        const pathname = window.location.pathname
        const info = pathname.split('/')

        setIdMuseo(info[2])
    },[])

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

      <GetMuseoIMG/>
      <div className="content-container">
        <div className="left-content">
            <GetSpecificMuseo/>

        </div>
        <div className="right-content">
        <div className="right-interno">
          <p style={{ fontWeight: "bold", fontSize: "19px" }}>Prenota un biglietto</p>
           <button type="submit">Prenota</button>
        </div>
         
       </div>
      </div>
      <div className="containerImmagini">
        <div className="image-container">

          <img src="immagine1.jpg" alt="Immagine 1" />
          <img src="immagine2.jpg" alt="Immagine 2" />
         <img src="immagine3.jpg" alt="Immagine 3" />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default MuseumPage;
