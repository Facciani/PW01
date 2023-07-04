import React, { useState, useEffect, useContext } from "react";
import { collection,addDoc,deleteDoc , query, getDocs, where, doc, getDoc } from "firebase/firestore";
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
import {auth} from "../dbconfig/dbconfig";
import {onAuthStateChanged} from "firebase/auth";
import async from "async";
import {waitFor} from "@testing-library/react";
import {FilterContext} from "../context/filterContext";
import {IdMostraContext} from "../context/idMostraContext";

const SetPreferito = () => {

    const [email, setEmail] = useState("")
    const { idMostra, setIdMostra } = useContext(IdMostraContext);
    const [isPre, setIsPre] = useState(false);

    useEffect(()=>{
        onAuthStateChanged(auth, (user)  => {
            if(user){
                setEmail(user.email)
                console.log("sei loggato")
                console.log("email",email)
                check(user.email)
            }else{
                console.log("non sei loggato")
            }
        })
    },[idMostra, isPre])

    const check =  async (mail) => {
        console.log(email,idMostra)

        const q =   query(collection(db, "preferiti"), where("email", "==", mail), where("idMostra" , "==", idMostra));

        const querySnapshot = await getDocs(q);

        console.log(querySnapshot)

        if(querySnapshot.empty){
            console.log("false")
            setIsPre(false)
        }else{
            console.log("true")
            setIsPre(true)
        }
    }

    const aggiungi = async () => {
        const docRef = await addDoc(collection(db, "preferiti"), {
            email: email,
            idMostra: idMostra
        });
        check(email)
    }

    const elimina = async () => {
        const q = query(collection(db, "preferiti"), where("email", "==", email), where("idMostra", "==", idMostra));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
            deleteDoc(doc(db, "preferiti", document.id))
        })
        check(email)
    }

    return(
        <>
            {email ? <>
                {isPre ? <button onClick={elimina}
                style={{
                    backgroundColor: "#f45757",
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    cursor: "pointer",
                    width: "150px",
                }}
            >
                Rimuovi dai preferiti
            </button> : <button onClick={aggiungi}
                style={{
                    backgroundColor: "#f45757",
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    cursor: "pointer",
                    width: "150px",
                }}
            >
                Aggiungi ai prefetiti
            </button>
                }</> : <button
                                style={{
                                    backgroundColor: "#f45757",
                                    color: "white",
                                    borderRadius: "5px",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                    cursor: "pointer",
                                    width: "150px",
                                }}
            >
                Loggarsi per poterlo aggiungere ai preferiti
            </button> }
        </>
    )
}

export {SetPreferito}