import Header from "./components/header";
import Footer from "./components/footer";
import "../src/index.css";
import {useEffect} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./components/dbconfig/dbconfig";
import {useNavigate} from "react-router-dom";

const PaginaUtente = () => {

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
    },[])

   return (
    <>
    <Header />


    <Footer />
    
    </>
 )
}

export default PaginaUtente

