import React, { useState, useEffect, useContext } from "react";
import { collection, query, getDocs, where, doc, getDoc } from "firebase/firestore";
import { db, storage } from "../dbconfig/dbconfig";
import { SearchContext } from "../context/searchContext";
import { YourLocationContext } from "../context/yourlocationContext";
import { getDistance, getPreciseDistance } from "geolib";
import { Link } from "react-router-dom";
import Filter from "../filter";
import { SearchResultContext } from "../context/searchResult";
import {IdMuseoContext} from "../context/idMuseoContext";
import {ref, getDownloadURL, listAll} from "firebase/storage"
import "../../index.css"
import {IdMostraContext} from "../context/idMostraContext";

const GetMostre = () => {
    const {idMuseo, setIdMuseo} = useContext(IdMuseoContext);
    const [mostre, setMostre] = useState([])
    const [temp, setTemp] = useState(null)

    let mostreCollectionRef = null;

    const getMostreByMuseoID = async () => {

        const q = await query(mostreCollectionRef, where("idMuseo", "==", idMuseo));
        const data = await getDocs(q);
        setTemp(data)
        const filterData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return filterData

    }

    const getMostreByMostraID = async () => {

        const data = await getDoc(mostreCollectionRef);
        const filterData = {dati: data.data(), id: data.id};
        console.log(filterData)
        return filterData

    }

    useEffect(()=>{

        (async()=>{
            if(!!idMuseo){
                mostreCollectionRef = collection(db, "musei-mostre");
                const dati = await Promise.all(await getMostreByMuseoID())

                for (const el of dati) {
                    console.log(el)
                    mostreCollectionRef = doc(db, "mostre", el.idMostra);
                    if(mostreCollectionRef !== undefined){
                        const res = await getMostreByMostraID()
                        if(res !== undefined){
                            setMostre((v)=>[...v,res])
                        }
                    }

                }
            }
        })()

    },[idMuseo])

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {mostre.map((el) => (
            <div
              key={el.id}
              style={{
                backgroundColor: "#EFDBB5",
                border: "1px solid #000",
                borderRadius: "8px",
                padding: "16px",
                margin: "8px",
                textAlign: "center",
                wordWrap: "break-word",
                width: "300px", 
                maxWidth: "100%", 
              }}
            >
              <p style={{ fontSize: "1.2em" }}><b>{el.dati.nome}</b></p>
              <p style={{ fontSize: "13px" }}><b>{el.dati.descrizione}</b></p>
              
              <p style={{ fontSize: "12px" }}>
                {el.dati.dataInizio} - {el.dati.dataFine}
              </p>
              <Link
                to={`/paginamostra/${el.id}`}
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  backgroundColor: "#f77878",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  marginTop: "16px",
                }}
              >
                Dettagli
              </Link>
            </div>
          ))}
        </div>
      );
      
}

const GetSpecificMostra = () => {
    const { idMostra, setIdMostra } = useContext(IdMostraContext);
    const [mostra, setMostra] = useState([])

    let mostreCollectionRef = null;

    useEffect(()=>{
        if(idMostra !== ""){
            mostreCollectionRef = doc(db, "mostre", idMostra);
            getMostreById()
        }
    },[idMostra])

    const getMostreById = async () => {
        try {
            const docSnap = await getDoc(mostreCollectionRef);
            setMostra(docSnap.data());
        } catch (err) {
            console.log(err.errorMessage, err.errorCode);
        }
    };

    return (
        <>
            <p style={{ fontWeight: "bold", fontSize: "25px", marginLeft: "20px", marginBottom: "10px" }}>{mostra.nome}</p>
            <br />
            <div style={{ display: "flex", marginBottom: "20px" }}>
                <div
                    style={{
                        padding: "10px",
                        borderRadius: "10px",
                        backgroundColor: "#EFDBB5",
                    }}
                >
                    <p style={{ fontWeight: "bold", fontSize: "16px", marginLeft: "20px", marginBottom: "10px" }}>{mostra.descrizione}</p>
                    <p style={{ fontWeight: "bold", fontSize: "16px", marginLeft: "20px", marginBottom: "10px" }}>Data inizio: {mostra.dataInizio}</p>
                    <p style={{ fontWeight: "bold", fontSize: "16px", marginLeft: "20px", marginBottom: "10px" }}>Data fine: {mostra.dataFine}</p>
                </div>
            </div>
        </>
    );
}

export {GetMostre, GetSpecificMostra}
