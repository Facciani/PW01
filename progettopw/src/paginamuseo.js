import React, {useContext, useEffect, useState} from "react";

import Header from "./components/header";
//import Suggest from "./components/suggestt";
import Footer from "./components/footer";
import uffizi from "./components/img/uffizi.jpeg";
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
        <GetMostre/>

      <Footer />
    </>
  );
}

export default MuseumPage;
