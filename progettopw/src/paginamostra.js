import Header from "./components/header";
import "../src/index.css";
import Footer from "./components/footer";
import imgpaginaMostra from "../src/components/img/imgpaginaMostra.jpeg";
import {useContext, useEffect, useState} from "react";
import {GetSpecificMostra} from "./components/crud/crudMostre"
import {IdMostraContext} from "./components/context/idMostraContext";

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
      <div class="container-mostra">
        <GetSpecificMostra/>
        <img src={imgpaginaMostra}></img>
      </div>
      <Footer />
    </>
  );
}
export default PaginaMostra;
