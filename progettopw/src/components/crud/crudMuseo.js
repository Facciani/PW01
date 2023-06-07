import {useState, useEffect, useContext} from "react";
import {collection, query, getDocs, where } from "firebase/firestore";
import {db} from "../dbconfig/dbconfig"
import {SearchContext} from "../context/searchContext";
const GetMusei = () => {

    const { search, setSearch } = useContext(SearchContext);

    const [museiList, setMuseiList] = useState([]);

    const museiCollectionRef = collection(db, "musei")

    useEffect(() => {
        getMusei()
    }, [search]);

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

    return (
        <div>
            {museiList.map((element) => (
                <div style={{borderStyle: "solid", borderColor:"black", display: "inline-block"}}>
                    <p>Id: {element.id}</p>
                    <p>Nome: {element.nome}</p>
                    <p>Descrizione: {element.descrizione}</p>
                </div>
            ))}
        </div>

    )
}

export {GetMusei}