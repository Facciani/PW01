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

import {Fade, Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


const GetMusei = () => {
  const { search, setSearch, searchDistance, setSearchDistance} = useContext(SearchContext);
  const { searchResult, setSearchResult } = useContext(SearchResultContext);
  const { lat, lon } = useContext(YourLocationContext);

  const museiCollectionRef = collection(db, "musei");

  useEffect(() => {
    getMuseiByCity();
  }, [search, searchDistance]);

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
      setSearchResult(final);
    } catch (err) {
      console.log(err.errorMessage, err.errorCode);
    }
  };

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

      {searchResult.length !== 0 ? <div className="div3">{searchResult.length} Risultati di ricerca</div> : <div className="div3"></div>}

      <div className="div2">
        <div className="museumdiv">
          {searchResult.map((element) => (
            <div className="tagricercamuseo">
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
                <>
                {!isNaN(element.distance) ? <> Distanza: {element.distance} km </> : <> Attivare la geolocalizzazione per conoscere la distanza </>}
                </>
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
        </div>
      </div>
    </>
  );
}

const GetMuseoIMG = () => {

    const {idMuseo, setIdMuseo} = useContext(IdMuseoContext);

    const [IMGurl, setIMGUrl] = useState([])

    let museoIMGref = null

    useEffect(() => {
        if (idMuseo !== "") {
          museoIMGref = ref(storage, `/${idMuseo}`)
          downloadIMG()
        }
    }, [idMuseo])

    const downloadIMG = () => {
        listAll(museoIMGref)
            .then((res)=>{
              res.items.forEach((itemRef)=>{
                getDownloadURL(ref(storage,itemRef.fullPath))
                    .then((url)=>{
                        console.log(url)
                      setIMGUrl([...IMGurl, url])
                        console.log(IMGurl)
                    })
              })
            })

    }

    return (
        <div className="slide-container">
            <Slide>
                {IMGurl.map((el)=>(
                    <div className="each-slide-effect">
                        <div style={{ 'backgroundImage': `url(${el})` }}>
                            <span>Slide 1</span>
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    )
}

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
}

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
}

export {GetMuseoIMG, GetMusei , GetSpecificMuseo};
