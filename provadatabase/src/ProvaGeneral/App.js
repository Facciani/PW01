import {Auth} from "./components/auth";
import { onAuthStateChanged } from "firebase/auth";
import {auth, db} from "./config/dbconfig"
import {useEffect, useState} from "react";
import {getDocs, collection, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore"
import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

function App() {

    const navigate = useNavigate();

    const [movieList, setMovieList] = useState([]);

    //new movie states
    const [newMovieTitle, setNewMovieTitle] = useState("")
    const [newMovieDate, setNewMovieDate] = useState(0)
    const [newMovieGood, setNewMovieGood] = useState(false)

    //update values
    const [updateTitle, setUpdateTitle] = useState("")


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

    const logout = () => {
        signOut(auth).then(() => {
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error.code, error.message)
        });
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){
                const email = user.email
                console.log("email", email)
            }else{
                console.log("none")
            }
        })
    })

    const inviaMovie = async () => {
        try{
            await addDoc(moviesCollectionRef, {title: newMovieTitle, relaseDate: newMovieDate, isGood: newMovieGood})
            getMovieList()
        }catch (err){
            console.log(err)
        }
    }

    const eliminaMovie = async (id) => {
        try{
            const movieDoc = doc(db, "movies" , id)
            await deleteDoc(movieDoc)
            getMovieList()
        }catch (err){
            console.log(err)
        }
    }

    const modificaMovie = async (id) => {
        try{
            const movieDoc = doc(db, "movies" , id)
            await updateDoc(movieDoc, {title: updateTitle})
            getMovieList()
        }catch (err){
            console.log(err)
        }
    }


    return (
        <div>

            <button onClick={logout}>Logout</button>

            <div>
                <input placeholder="Movie title...." onChange={(e) => setNewMovieTitle(e.target.value)}/>
                <input placeholder="Date...." type="number" onChange={(e) => setNewMovieDate(Number(e.target.value))}/>
                <input type="checkbox" onChange={(e) => setNewMovieGood(e.target.checked)}/>
                <label>IsGood?</label>
                <button onClick={inviaMovie}>Invia</button>
            </div>

            <div>
                {movieList.map((movie) => (
                    <div style={{borderStyle: "solid", borderColor:"black"}}>
                        <h1>{movie.title}</h1>
                        <p> Date: {movie.relaseDate}</p>
                        <p> isGood: {movie.isGood ? "yes" : "no"}</p>
                        <p> id: {movie.id}</p>
                        <button onClick={() => eliminaMovie(movie.id)}>Elimina movie</button>
                        <input placeholder="Nuovo titolo" onChange={(e) => setUpdateTitle(e.target.value)}/>
                        <button onClick={() => modificaMovie(movie.id)}>Aggiorna titolo</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
