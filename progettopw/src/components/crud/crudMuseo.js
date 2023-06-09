import { useState, useEffect, useContext } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../dbconfig/dbconfig";
import { SearchContext } from "../context/searchContext";
import { YourLocationContext } from "../context/yourlocationContext";
import { getDistance, getPreciseDistance } from "geolib";
import { Link } from "react-router-dom";
import Filter from "../filter";
import { SearchResultContext } from "../context/searchResult";

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
                  to={"/paginamuseo"}
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

export { GetMusei };
