import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../ProvaGeneral/config/dbconfig";
import { NavLink, useNavigate } from 'react-router-dom'

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

    return <div>Home</div>
}

export default Home