import { useContext, useEffect, useState } from "react";
import { IdMostraContext } from "../context/idMostraContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../dbconfig/dbconfig";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import ReactModal from 'react-modal';

const SetRecensione = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const { idMostra, setIdMostra } = useContext(IdMostraContext);

    const [rec, setRec] = useState([]);

    const [voto, setVoto] = useState(0);
    const [desc, setDesc] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setEmail(user.email);
                console.log("sei loggato");
            } else {
                console.log("non sei loggato");
            }
            getRecensioni();
        });
    }, [idMostra, isOpen]);

    const aggiungi = async () => {
        const docRef = await addDoc(collection(db, "recensioni"), {
            commento: desc,
            idMostra: idMostra,
            email: email,
            voto: voto
        });
        setIsOpen(false);
    };

    const getRecensioni = async () => {

        const q = query(collection(db, "recensioni"), where("idMostra", "==", idMostra));
        const querySnapshot = await getDocs(q);
        setRec([]);
        querySnapshot.forEach((document) => {
            console.log(document.data());

            setRec(prevState => [...prevState, document.data()]);
        });
    };

    const divStyleRecensioni = {
        textAlign: 'center',
        margin: '20px',
        backgroundColor: '#EFDBB5',
    };

    //per modificare schermata recensione
    const style = {
        content: {
            height: "200px",
            width: '500px',
            border: '2px solid black',
            borderRadius: '10px',
            backgroundColor: '#EFDBB5',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
            padding: '20px',
        },
        input: {
            marginBottom: '20px',
            width: '200px',
            border: '1px solid black',
            borderRadius: '5px',
            padding: '5px',
        },
        button: {
            marginTop: '10px',
        },
    };

    const Component = () => {
        return (
            <div style={style.content}>
                <input
                    style={{ ...style.input, width: '80px' }}
                    type="number"
                    placeholder="voto"
                    onChange={(v) => setVoto(Number(v.target.value))}
                />
                <input
                    style={{ ...style.input, width: '120px', color: 'red' }}
                    type="text"
                    placeholder="commento"
                    onChange={(v) => setDesc(v.target.value)}
                />
                <button style={style.button} onClick={aggiungi}>
                    Invia
                </button>
            </div>
        );
    };


    return (
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
                        <input style={{ marginBottom: "20px", width: "200px" }} type={"number"} placeholder={"voto"} onChange={(v) => (setVoto(Number(v.target.value)))} />
                        <input style={{ marginBottom: "20px", width: "200px" }} type="text" placeholder="commento" onChange={(v) => setDesc(v.target.value)}
                        />
                        <button onClick={aggiungi}>Invia</button>
                    </ReactModal>
                </>
                :
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
                <div style={{ textAlign: "left", margin: "10px", border: "1px solid black", backgroundColor: "#EFDBB5", borderRadius: "10px", maxHeight: "200px", overflow: "auto" }}>
                    <div style={{ marginLeft: "20px", margin: "25px" }}>
                        <h3 style={{ textAlign: 'center', fontSize: "20px" }}>Commenti</h3>
                        {rec.map((el) => (
                            <p key={el.id} style={{ marginBottom: "10px", whiteSpace: "pre-wrap", fontSize: "12px" }}>
                                <b >{el.email}</b> | {el.voto} | <p style= {{padding: "5px"}}>{el.commento}</p>
                            </p>
                        ))}
                    </div>
                </div>
            </>
        </>
    )
}

export { SetRecensione };
