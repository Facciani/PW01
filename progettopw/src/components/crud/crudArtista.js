import React, {useContext, useEffect, useState} from "react";
import {IdMostraContext} from "../context/idMostraContext";
import {doc, getDoc} from "firebase/firestore";
import {db, storage} from "../dbconfig/dbconfig";
import {IdArtistaContext} from "../context/idArtistaContext";
import {getDownloadURL, listAll, ref} from "firebase/storage";

const GetSpecificArtista = () => {
    const { idArtista, setIdArtista } = useContext(IdArtistaContext);
    const [artista, setArtista] = useState([])

    let artistaCollectionRef = null;

    useEffect(()=>{
        if(idArtista !== ""){
            artistaCollectionRef = doc(db, "artisti", idArtista);
            getArtistaById()
        }
    },[idArtista])

    const getArtistaById = async () => {
        try {
            const docSnap = await getDoc(artistaCollectionRef);
            setArtista(docSnap.data());
        } catch (err) {
            console.log(err.errorMessage, err.errorCode);
        }
    };

    return (
        <div style={{ 
            maxWidth: '750px', 
            margin: '20px auto 0', 
            border: '2px solid black', 
            padding: '10px',
            backgroundColor: '#EFDBB5',
            borderRadius: '10px',
          }}>
              <h1 style={{ textAlign: 'center' }}><b>{artista.nome} {artista.cognome}</b></h1>  
              <p style={{ marginBottom: '50px', fontSize: '16px', textAlign: 'center' }}>{artista.descrizione}</p>
          </div>

     


    );
}

const GetArtistaIMG = () => {

    const {idArtista, setIdArtista} = useContext(IdArtistaContext);

    let artistaIMGref = null

    useEffect(() => {
        if (idArtista !== "") {
            artistaIMGref = ref(storage, `/artisti/${idArtista}`)
            downloadIMG()
        }
    }, [idArtista])

    const downloadIMG =  async () => {
        const list = await listAll(artistaIMGref);
        for (const itemRef of list.items) {
            const url = await getDownloadURL(ref(storage,itemRef.fullPath))
            console.log(url)
            document.getElementById("fotomain").src = url
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
            <img
                id="fotomain"
                alt="mostra"
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
        </div>
    )
}

export {GetSpecificArtista, GetArtistaIMG}