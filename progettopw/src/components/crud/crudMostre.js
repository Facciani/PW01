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

    const getMostreByMostraID = async () => {

        const data = await getDoc(mostreCollectionRef);
        const filterData = data.data()
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
        <div>
            {mostre.map((el)=>(
                <>
                    <p>{el.id} {el.nome} {el.descrizione} {el.dataInizio} {el.dataFine}</p>
                </>
            ))}
        </div>
    )
}

export {GetMostre}
