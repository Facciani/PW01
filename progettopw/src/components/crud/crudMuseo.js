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
import async from "async";
import {waitFor} from "@testing-library/react";
import {FilterContext} from "../context/filterContext";

// import {Fade, Slide} from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'


const GetMusei = () => {
    const { search, setSearch, searchDistance, setSearchDistance} = useContext(SearchContext);
    const { searchResult, setSearchResult } = useContext(SearchResultContext);
    const { lat, lon } = useContext(YourLocationContext);
    const {filter , setFilter} = useContext(FilterContext)

  const museiCollectionRef = collection(db, "musei");

  useEffect(() => {
    getMuseiByCity();
    console.log(filter)
  }, [search, searchDistance, filter]);

  useEffect(()=>{
      setFilter("none")
  },[search,searchDistance])

  const getMuseiByCity = async () => {
    try {
      const q = query(museiCollectionRef, where("citta", "==", search));
      const data = await getDocs(q);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        distance: calculateDistance(doc.data())
      }));

      const final = filterDistance(filterData);
      const final2 = filterType(final)
      setSearchResult(final2);
    } catch (err) {
      console.log(err.errorMessage, err.errorCode);
    }
  };

    const filterType = (list) => {
        if(filter === "none"){
            return list
        }else{
            console.log(searchDistance)
            let newList = [];
            list.forEach((el) => {
                if(el.genere === filter){
                    newList = [...newList, el]
                    console.log("Ciao")
                }
            })
            return newList
        }
    }

  const filterDistance = (list) => {
    console.log(searchDistance)
    let newList = [];
    list.forEach((el) => {
      if(Number(el.distance) <= searchDistance || searchDistance === null || searchDistance === ""){
        newList = [...newList, el]
        console.log("Ciao")
      }
    })
    return newList
  }

  const calculateDistance = (data) => {
      const latlon = data.cordinate.split(";");
      const dis = getPreciseDistance(
        { latitude: lat, longitude: lon },
        { latitude: latlon[0], longitude: latlon[1] }
      );
      return parseInt(dis/1000)
  };

  return (
    <div className="parent">
      <Filter />
      <br></br>
      {searchResult.length !== 0 ? (
        <div  style={{ fontWeight: 'bold', fontSize: '18px' }} className="div3">{searchResult.length} Risultati di ricerca</div>
      ) : (
        <div className="div3"></div>
      )}
      <br></br>
      <div className="museumdiv">
        {searchResult.map((element) => (
          <div className="tagricercamuseo" key={element.id}>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1.1em",
                textAlign: "center",
                padding: "1%",
              }}
            >
              {element.nome}
            </p>
            <p style={{ fontWeight: "bold", padding: "2%" }}>
              {element.descrizione}
            </p>
            <p style={{ fontWeight: "bold", padding: "2%" }}>
              {!isNaN(element.distance)
                ? `Distanza: ${element.distance} km`
                : "Attivare la geolocalizzazione per conoscere la distanza"}
            </p>
            <button className="buttdett">
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to={`/paginamuseo/${element.id}`}
              >
                Dettagli
              </Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const GetSpecificMuseo = () => {

  const { idMuseo, setIdMuseo } = useContext(IdMuseoContext);
  const [museo, setMuseo] = useState([])

  let museiCollectionRef = null;

  useEffect(()=>{
    if(idMuseo !== ""){
      museiCollectionRef = doc(db, "musei", idMuseo);
      getMuseiById()
    }
  },[idMuseo])

    const getMuseiById = async () => {
    try {
      const docSnap = await getDoc(museiCollectionRef);
      setMuseo(docSnap.data());
    } catch (err) {
      console.log(err.errorMessage, err.errorCode);
    }
  };

  return (
    <>
      <p style={{ fontWeight: "bold", fontSize: "25px", marginLeft: "20px", marginBottom: "10px" }}>{museo.nome}</p>
      <p style={{ fontWeight: "bold", fontSize: "18px", color: "#F45757", marginLeft: "20px", marginBottom: "10px" }}>{museo.indirizzo}, {museo.citta}</p>
      <br />
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div
          style={{
            padding: "10px",
            borderRadius: "10px",
            backgroundColor: "#EFDBB5",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "16px", marginLeft: "20px", marginBottom: "10px" }}>{museo.descrizione}</p>
          <p style={{ fontWeight: "bold", fontSize: "16px", marginLeft: "20px", marginBottom: "10px" }}>Orari: {museo.orari}</p>
          <p style={{ fontWeight: "bold", fontSize: "16px", marginLeft: "20px", marginBottom: "10px" }}>Sito Web: {museo.sitoWeb}</p>
          <p style={{ fontWeight: "bold", fontSize: "16px", marginLeft: "20px", marginBottom: "10px" }}>Telefono: {museo.telefono}</p>
            <iframe
                src={museo.src}
                width="600"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
            />
        </div>
      </div>
    </>
  );
}

const GetMuseoIMG = () => {

    const {idMuseo, setIdMuseo} = useContext(IdMuseoContext);

    let museoIMGref = null

    useEffect(() => {
        if (idMuseo !== "") {
            museoIMGref = ref(storage, `/musei/${idMuseo}`)
            downloadIMG()
        }
    }, [idMuseo])

    const downloadIMG =  async () => {
        const list = await listAll(museoIMGref);
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
        alt="Museo"
        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
      />
    </div>
    )
}

export {GetMuseoIMG, GetMusei , GetSpecificMuseo};
