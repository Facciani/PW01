import {useState, useEffect, useContext} from "react";
import {collection, query, getDocs, where } from "firebase/firestore";
import {db} from "../dbconfig/dbconfig"
import {SearchContext} from "../context/searchContext";
import {YourLocationContext} from "../context/yourlocationContext";
import { getDistance, getPreciseDistance } from 'geolib';

const GetMusei = () => {
    const [museiList, setMuseiList] = useState([]);

    const { search, setSearch } = useContext(SearchContext);
    const { lat, lon } = useContext(YourLocationContext);

    const museiCollectionRef = collection(db, "musei");


    useEffect(() => {
        calculateDistance()
        getMusei()

    },   [search]);

    const getMusei = async () => {
        try{
            const q = query(museiCollectionRef, where("citta", "==" , search))
            const data = await getDocs(q)
            const filterData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setMuseiList(filterData)
        }catch (err){
            console.log(err.errorMessage, err.errorCode)
        }
    }

    const calculateDistance = () =>{
        museiList.map((el)=>{
            const latlon = el.cordinate.split(';')
            const dis = getPreciseDistance(
                { latitude: lat, longitude: lon },
                { latitude: latlon[0], longitude: latlon[1] }
            );
            console.log(dis/1000)
        })
    }

  return (
        <div className="museumdiv">
            {museiList.map((element) => (
                <div
                  style={{
                    borderStyle: "solid",
                    borderColor: "black",
                    display: "inline-block",
                    padding: "2%",
                  }}
                >
                  <p>Id: {element.id}</p>
                  <p>Nome: {element.nome}</p>
                  <p>Descrizione: {element.descrizione}</p>
                </div>
                ))
            }
        </div>
    )
};

export { GetMusei };
