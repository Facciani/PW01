import React, { useState, useEffect, useContext } from "react";
import { collection, query, getDocs, where, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../dbconfig/dbconfig";
import { Link } from "react-router-dom";
import { IdMostraContext } from "../context/idMostraContext";

const Card = ({ nome, descrizione, genere, idArtista }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #000",
        backgroundColor: "#EFDBB5",
        padding: "10px",
        borderRadius: "8px",
        textAlign: "center",
        width: "300px",
        margin: "10px",
      }}
    >
      <p style={{ fontSize: "15px" }}><b>{nome}</b></p>
      <p style={{ fontSize: "15px", flex: 1 }}>{descrizione}</p>
      <p style={{ fontSize: "14px" }}><b>Genere: </b>{genere}</p><br></br>
      <button
        style={{
          fontSize: "14px",
          padding: "8px 12px",
          backgroundColor: "EFDBB5", 
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          margin: "0 auto", 
        }}
        onClick={() => {
        }}
      >
        <Link
          to={`/paginaartista/${idArtista}`}
          style={{ color: "white", textDecoration: "none" }}
        >
          Dettagli
        </Link>
      </button>
    </div>
  );

const CardContainer = ({ opere }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
  >
    {opere.map((el) => (
      <Card
        key={el.dati.idArtista}
        nome={el.dati.nome}
        descrizione={el.dati.descrizione}
        genere={el.dati.genere}
        idArtista={el.dati.idArtista}
      />
    ))}
  </div>
);

const GetOpere = () => {
  const { idMostra } = useContext(IdMostraContext);
  const [opere, setOpere] = useState([]);

  const getOpereByMostraID = async () => {
    const opereCollectionRef = collection(db, "opere-mostre");
    const q = query(opereCollectionRef, where("idMostra", "==", idMostra));
    const data = await getDocs(q);
    const filterData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filterData;
  };

  const getOpereByOperaID = async (idOpera) => {
    const opereCollectionRef = doc(db, "opere", idOpera);
    const data = await getDoc(opereCollectionRef);
    const filterData = { dati: data.data(), id: data.id };
    return filterData;
  };

  useEffect(() => {
    (async () => {
      if (!!idMostra) {
        const dati = await Promise.all(await getOpereByMostraID());

        for (const el of dati) {
          const res = await getOpereByOperaID(el.idOpera);
          if (res !== undefined) {
            setOpere((v) => [...v, res]);
          }
        }
      }
    })();
  }, [idMostra]);

  return <CardContainer opere={opere} />;
};

export { GetOpere };