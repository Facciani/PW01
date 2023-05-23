import {Auth} from "./components/auth";
import {db} from "./config/dbconfig"
import {useEffect, useState} from "react";
import {getDocs, collection, addDoc} from "firebase/firestore"

function App() {

    const [movieList, setMovieList] = useState([]);

    //new movie states
    const [newMovieTitle, setNewMovieTitle] = useState("")
    const [newMovieDate, setNewMovieDate] = useState(0)
    const [newMovieGood, setNewMovieGood] = useState(false)


    const moviesCollectionRef = collection(db, "movies")

    const getMovieList = async () => {
        //leggere i dati
        //impostare i dati
        try{
            const data = await getDocs(moviesCollectionRef)
            const filterData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setMovieList(filterData)
        }catch (err){
            console.log(err)
        }
    }

    useEffect(() => {
        getMovieList()
    }, []);

    const inviaMovie = async () => {
        try{
            await addDoc(moviesCollectionRef, {title: newMovieTitle, relaseDate: newMovieDate, isGood: newMovieGood})
            getMovieList()
        }catch (err){
            console.log(err)
        }
    }


    return (
        <div>
            <Auth />

            <div>
                <input placeholder="Movie title...." onChange={(e) => setNewMovieTitle(e.target.value)}/>
                <input placeholder="Date...." type="number" onChange={(e) => setNewMovieDate(Number(e.target.value))}/>
                <input type="checkbox" onChange={(e) => setNewMovieGood(e.target.checked)}/>
                <label>IsGood?</label>
                <button onClick={inviaMovie}>Invia</button>
            </div>

            <div>
                {movieList.map((movie) => (
                    <div>
                        <h1>{movie.title}</h1>
                        <p> Date: {movie.relaseDate}</p>
                        <p> isGood: {movie.isGood ? "yes" : "no"}</p>
                        <p> id: {movie.id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
