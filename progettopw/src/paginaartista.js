import Header from "./components/header";
import "../src/index.css";
import imgLeo from "../src/components/img/imgLeo.jpeg";
import Footer from "./components/footer";
import {useContext, useEffect} from "react";
import {IdMostraContext} from "./components/context/idMostraContext";
import {IdArtistaContext} from "./components/context/idArtistaContext";
import {GetSpecificMostra} from "./components/crud/crudMostre";
import {GetArtistaIMG, GetSpecificArtista} from "./components/crud/crudArtista";

function ArtistPage() {

  const { idArtista, setIdArtista } = useContext(IdArtistaContext);

  useEffect(()=>{
    const pathname = window.location.pathname
    const info = pathname.split('/')

    setIdArtista(info[2])
  },[])

  return (
    <>
      <Header />
      <div className="Leonardo-vinci">
        <div className="imm-leonardo">
          <GetArtistaIMG/>
        </div>
        <div className="testo-leonardo" style={{ fontWeight: "bold" }}> 
          <GetSpecificArtista/>
        </div>
      </div>



      <Footer />
    </>
  );
}

export default ArtistPage;
