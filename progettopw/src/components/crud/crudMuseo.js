import { useState, useEffect, useContext } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../dbconfig/dbconfig";
import { SearchContext } from "../context/searchContext";
import { YourLocationContext } from "../context/yourlocationContext";
import { getDistance, getPreciseDistance } from "geolib";
import { Link } from "react-router-dom";

const GetMusei = () => {
  const [museiList, setMuseiList] = useState([]);

  const { search, setSearch } = useContext(SearchContext);
  const { lat, lon } = useContext(YourLocationContext);

  const museiCollectionRef = collection(db, "musei");

  useEffect(() => {
    getMusei();
  }, [search]);

  const getMusei = async () => {
    try {
      const q = query(museiCollectionRef, where("citta", "==", search));
      const data = await getDocs(q);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      calculateDistance(filterData);
      setMuseiList(filterData);
    } catch (err) {
      console.log(err.errorMessage, err.errorCode);
    }
  };

  const calculateDistance = (list) => {
    list.map((el) => {
      const latlon = el.cordinate.split(";");
      const dis = getPreciseDistance(
        { latitude: lat, longitude: lon },
        { latitude: latlon[0], longitude: latlon[1] }
      );
      console.log(dis / 1000);
    });
  };

  return (
    <div className="parent">
      <div className="div1">
        <h3>FILTRI</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi autem
          minima dolor deserunt sed nobis numquam aspernatur ullam, explicabo
          vero assumenda laudantium itaque ex maxime voluptatum! Quo ipsam
          nesciuntrepellat?
        </p>
      </div>
      <div className="div2">
        <div className="museumdiv">
          {museiList.map((element) => (
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
