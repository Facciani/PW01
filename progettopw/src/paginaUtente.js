import Header from "./components/header";
import Footer from "./components/footer";
import "../src/index.css";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "./components/dbconfig/dbconfig";
import {useNavigate} from "react-router-dom";

import Avatar from "../src/components/img/Avatar.png";
import PWfoto from "../src/components/img/PWfoto.jpeg";
import PWfoto2 from "../src/components/img/PWfoto2.jpeg";
import PWfoto3 from "../src/components/img/PWfoto3.jpeg";
import {collection, getDocs, doc, query, where, getDoc} from "firebase/firestore";
import {unstable_batchedUpdates} from "react-dom";
import async from "async";

const PaginaUtente = () => {

  const [utente, setUtente] = useState({})
  const [emailU, setEmailU] = useState("")
  const navigate = useNavigate();

  const [resultRec, setResultRec] = useState([])
  const [resultPre, setResultPre] = useState([])


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("onAuthStateChanged",user.email)
        setEmailU(user.email)
      } else {
        navigate("/login")
      }
    })
    setUtenteInto()
    getMostreByRecensioni()
    getMostreByPreferiti()
  },[emailU])

  const getMostreByRecensioni = async (email) => {
    console.log("getMostreByRecensioni",emailU)

    const q = query(collection(db, "recensioni"),where("email","==",emailU));
    const querySnapshot = await getDocs(q);
    //setRec([])
    querySnapshot.forEach(async (document) => {


      /*setRec(prevState => [...prevState,document.data()])
      console.log(document)*/

      const p = doc(db,"mostre",document.data().idMostra)
      const result = await getDoc(p)
      /*console.log("result",result)
      setMostre(prevState => [...prevState,result.data()])*/

      const res = {rec: document.data(), mostre: result.data()}

      setResultRec(prevState => [...prevState,res])

      console.log(res);
    })
  }

  const getMostreByPreferiti = async (email) => {
    console.log("getMostreByPreferiti",emailU)

    const q = query(collection(db, "preferiti"),where("email","==",emailU));
    const querySnapshot = await getDocs(q);
    //setRec([])
    querySnapshot.forEach(async (document) => {

      const p = doc(db,"mostre",document.data().idMostra)
      const result = await getDoc(p)

      const res = {rec: document.data(), mostre: result.data()}

      setResultPre(prevState => [...prevState,res])

      console.log(res);
    })
  }

  const setUtenteInto = async (email) => {
    console.log("setUtenteInto",emailU)
    const q = query(collection(db, "utenti"),where("email","==",emailU));
    const querySnapshot = await getDocs(q);
    setUtente({})
    querySnapshot.forEach((document) => {
      setUtente(document.data())
      console.log(document.data())
    })
  }

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
              <p>Utente registrato dal {utente.primoAccesso}</p>
              <p><b>E-mail: </b>{utente.email}</p>
              <p><b>Nome Utente: </b>{utente.nome} {utente.cognome}</p>
            </div>
          </div>

        </div>
            <div className="mini-divciao">
                <h1 >Le tue recensioni</h1>
            </div>

          <div className="card-containerU">
            {resultRec.map((el)=>(
                <div className="cardU">
                  <h1>Recensione</h1>
                  <p><b>Voto: {el.rec.voto}</b> </p>
                  <p><b>Commento: {el.rec.commento}</b></p>
                  <h1>Mostra</h1>
                  <p><b>Nome: {el.mostre.nome}</b> </p>
                  <p><b>Descrizione: {el.mostre.descrizione}</b> </p>
                  <p><b>Data inizio: {el.mostre.dataInizio}</b> </p>
                  <p><b>Data fine: {el.mostre.dataFine}</b> </p>
                </div>
            ))}
          </div>


            <div className="mini-divciao">
                <h1>Mostre preferite</h1>
            </div>

            <div className="card-containerU1">
              {resultPre.map((el)=>(

                  <div className="cardU1" >
                    <h1>Mostra</h1>
                    <p><b>Nome: {el.mostre.nome}</b> </p>
                    <p><b>Descrizione: {el.mostre.descrizione}</b> </p>
                    <p><b>Data inizio: {el.mostre.dataInizio}</b> </p>
                    <p><b>Data fine: {el.mostre.dataFine}</b> </p>
                  </div>
              ))}
          </div>
          <Footer />
        </>
      );
}

export default PaginaUtente