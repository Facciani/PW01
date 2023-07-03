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

const GetOpere = () => {
    const {idMostra, setMostra} = useContext(IdMostraContext);
    const [opere, setOpere] = useState([])
    const [temp, setTemp] = useState(null)

    let opereCollectionRef = null;

    const getOpereByMostraID = async () => {
        const q = await query(opereCollectionRef, where("idMostra", "==", idMostra));
        const data = await getDocs(q);


        setTemp(data)
        const filterData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        return filterData

    }

    const getOpereByOperaID = async () => {

        const data = await getDoc(opereCollectionRef);
        const filterData = {dati: data.data(), id: data.id};
        return filterData

    }

    useEffect(()=>{

        (async()=>{
            if(!!idMostra){
                opereCollectionRef = collection(db, "opere-mostre");
                const dati = await Promise.all(await getOpereByMostraID())

                //console.log(dati)

                for (const el of dati) {
                    opereCollectionRef = doc(db, "opere", el.idOpera);
                    if(opereCollectionRef !== undefined){
                        const res = await getOpereByOperaID()
                        if(res !== undefined){
                            setOpere((v)=>[...v,res])
                        }
                    }

                }
            }
        })()

    },[idMostra])

    return (
        <>
            {opere.map((el)=>(
                <p>{el.dati.nome} {el.dati.descrizione} {el.dati.genere}

                    <Link
                        to={`/paginaartista/${el.dati.idArtista}`}
                    >
                        Dettagli
                    </Link>

                </p>

            ))}
        </>
    )
}

export {GetOpere}
