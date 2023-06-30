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

    useEffect(()=>{

        (async()=>{
            if(!!idMuseo){
                mostreCollectionRef = collection(db, "musei-mostre");
                const dati = await Promise.all(await getMostreByMuseoID())
                setMostre(dati)
            }
        })()

    },)

    return (
        <div>
            {idMuseo}
            {mostre.map((el)=>(
                <>
                    <p>{el.idMostra}</p>
                </>
            ))}
        </div>
    )
}

export {GetMostre}
