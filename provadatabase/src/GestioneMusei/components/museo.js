import {useEffect, useState} from "react";
import {collection, query, getDocs, where } from "firebase/firestore";
import {db} from "../../ProvaGeneral/config/dbconfig";
import {Link, useNavigate} from "react-router-dom";
import GoogleMapReact from 'google-map-react';

const InfoMuseo = (element) => {

    return(
        <div style={{display: "flex"}}>
            <div style={{borderStyle: "solid", borderColor:"black"}}>
                <p>Id: {element.element.id}</p>
                <p>Nome: {element.element.nome}</p>
                <p>Descrizione: {element.element.descrizione}</p>
                <p>Indirizzo: {element.element.indirizzo}</p>
                <p>Orari: {element.element.orari}</p>
                <p>Sito Web: {element.element.sitoWeb}</p>
                <p>Telefono: {element.element.telefono}</p>
                <div>
                    <iframe
                        src = {element.element.src} width="600" height="450">
                    </iframe>
                </div>
             </div>

        </div>
    )
}

const GetMusei = () => {
    const [museiList, setMuseiList] = useState([]);

    const museiCollectionRef = collection(db, "musei")

    useEffect(() => {
        getMusei()
    }, []);

    const getMusei = async () => {
        try{
            //const q = query(museiCollectionRef, where("nome", "==", "Museo1"))
            const data = await getDocs(museiCollectionRef)
            const filterData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setMuseiList(filterData)
        }catch (err){
            console.log(err.errorMessage, err.errorCode)
        }
    }

    return (
        <div>
            {museiList.map((element) => (
                <div style={{borderStyle: "solid", borderColor:"black", display: "inline-block"}}>
                    <p>Id: {element.id}</p>
                    <p>Nome: {element.nome}</p>
                    <p>Descrizione: {element.descrizione}</p>
                    <Link to="/dettaglio" state={element}>
                        Esplora
                    </Link>
                </div>
            ))}
        </div>
    )
}

export {InfoMuseo,GetMusei}