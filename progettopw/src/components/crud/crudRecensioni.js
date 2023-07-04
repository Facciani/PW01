import {useContext, useEffect, useState} from "react";
import {IdMostraContext} from "../context/idMostraContext";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "../dbconfig/dbconfig";
import {addDoc, collection, deleteDoc, doc, getDocs, query, where} from "firebase/firestore";
import ReactModal from 'react-modal';

const SetRecensione = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("")
    const { idMostra, setIdMostra } = useContext(IdMostraContext);

    const [rec, setRec] = useState([])

    const [voto, setVoto] = useState(0)
    const [desc, setDesc] = useState("")

    useEffect(()=>{
        onAuthStateChanged(auth, (user)  => {
            if(user){
                setEmail(user.email)
                console.log("sei loggato")
            }else{
                console.log("non sei loggato")
            }
            getRecensioni()
        })
    },[idMostra,isOpen])

    const aggiungi = async () => {
        const docRef = await addDoc(collection(db, "recensioni"), {
            commento: desc,
            idMostra: idMostra,
            email: email,
            voto: voto
        });
        setIsOpen(false)
    }

    const getRecensioni = async () => {

        const q = query(collection(db, "recensioni"),where("idMostra","==",idMostra));
        const querySnapshot = await getDocs(q);
        setRec([])
        querySnapshot.forEach((document) => {
            console.log(document.data())

            setRec(prevState => [...prevState,document.data()])
        })
    }


    //per modificare schermata recensione
    const style = {
        content: {
            height: '40%',
            width: '40%',
        }
    };

    return(
        <>
            {email ?
                <>
                <button onClick={setIsOpen}
                style={{
                    backgroundColor: "#f45757",
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    cursor: "pointer",
                    width: "120px",
                }}
            >
                Aggiungi recensione
            </button>
                    <ReactModal
                        isOpen={isOpen}
                        onRequestClose={() => setIsOpen(false)}
                        style={style}
                    >
                        <input type={"number"} placeholder={"voto"} onChange={(v)=>(setVoto(Number(v.target.value)))}/>
                        <input type={"text"} placeholder={"commento"} onChange={(v)=>(setDesc(v.target.value))}/>
                        <button onClick={aggiungi}>Invia</button>
                    </ReactModal>
                </> :
                <button
                    style={{
                        backgroundColor: "#f45757",
                        color: "white",
                        borderRadius: "5px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        cursor: "pointer",
                        width: "120px",
                    }}
                >
                    Loggarsi per poter aggiungere una recensione
                </button>}
            <>
                {rec.map((el)=>(
                    <p>{el.email} {el.voto} {el.commento}</p>
                ))}
            </>
        </>
    )
}

export {SetRecensione}