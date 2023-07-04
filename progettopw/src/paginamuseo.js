import React, {useContext, useEffect, useState} from "react";

import Header from "./components/header";
import Footer from "./components/footer";
import "../src/index.css";
import {GetSpecificMuseo, GetMuseoIMG} from "./components/crud/crudMuseo";
import {IdMuseoContext} from "./components/context/idMuseoContext";
import {GetMostre} from "./components/crud/crudMostre";



function MuseumPage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { idMuseo, setIdMuseo } = useContext(IdMuseoContext);

    useEffect(()=>{
        const pathname = window.location.pathname
        const info = pathname.split('/')

        setIdMuseo(info[2])
    },[])

  return (
<>
  <Header />

  <GetMuseoIMG />
  <div className="content-containerM">
    <div className="divPoderoso">
      <GetSpecificMuseo />    

<button
  /*onClick={funzione sgrava che devi mettere tu <3} */
  style={{
    backgroundColor: "#f45757",
    color: "white",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
    cursor: "pointer",
  }}
>
  Bottone Rosso
</button>
      <p style={{ fontWeight: "bold", fontSize: "19px" }}>Mostre disponibili</p>
    </div>
  </div>
  <div style={{ position: "relative" }}>
    <GetMostre />

  </div>
  <Footer />
</>
  );
}

export default MuseumPage;
