import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../ProvaGeneral/config/dbconfig";
import { NavLink, useNavigate } from 'react-router-dom'
import Logout from "../components/Logout";
import { Link } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){
                const email = user.email
                console.log("email", email)
            }else{
                console.log("none")
                navigate("/login")
            }
        })
    })

    return (
        <div>
            <h1>Home</h1>
            <Logout/>
            <Link className="nav-link active" to={`/review`}>
                Review
            </Link>
        </div>
    )
}

export default Home