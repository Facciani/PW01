import Header from "./components/header";
import "../src/index.css";
import Footer from "./components/footer";
import imgpaginaMostra from "../src/components/img/imgpaginaMostra.jpeg";
import {useContext, useEffect, useState} from "react";
import {GetMostraIMG, GetSpecificMostra} from "./components/crud/crudMostre"
import {IdMostraContext} from "./components/context/idMostraContext";
import {GetOpere} from "./components/crud/crudOpera";

function PaginaMostra() {

    const { idMostra, setIdMostra } = useContext(IdMostraContext);

    useEffect(()=>{
        const pathname = window.location.pathname
        const info = pathname.split('/')

        setIdMostra(info[2])
    },[])

    return (
      <>
        <Header />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div class="container-mostra">
            <GetMostraIMG/>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div class="text-mostra">
              <GetSpecificMostra />
                <GetOpere/>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );      
}
export default PaginaMostra;
