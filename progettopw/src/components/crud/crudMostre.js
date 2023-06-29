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

    let mostreCollectionRef = null;

    const getMostreByMuseoID = async () => { 

        const q = query(mostreCollectionRef, where("idMuseo", "==", idMuseo));
        const data = await getDocs(q);
        const filterData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));

        console.log(filterData)
    }

    useEffect(()=>{
        if(idMuseo !== ""){
            mostreCollectionRef = collection(db, "musei-mostre");
            getMostreByMuseoID()
        }
    },[idMuseo])

    return (
        <div>
            {idMuseo}
        </div>
    )
}

export {GetMostre}
