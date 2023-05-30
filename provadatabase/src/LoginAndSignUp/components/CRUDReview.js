import {useEffect, useState} from "react";
import {addDoc, collection, getDocs} from "firebase/firestore";
import {auth, db} from "../../ProvaGeneral/config/dbconfig";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const CRUDReview = () => {
    const [newReviewValue, setNewReviewValue] = useState(0)
    const [newReviewDesc, setNewReviewDesc] = useState("")

    const [reviewList, setReviewList] = useState([]);

    const reviewCollectionRef = collection(db, "review")

    const getReviewList = async () => {
        try{
            const data = await getDocs(reviewCollectionRef)
            const filterData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setReviewList(filterData)
        }catch (err){
            console.log(err)
        }
    }

    const sendReview = async () => {

        onAuthStateChanged(auth, async (user) => {
            if(user){
                const email = user.email
                try{
                    await addDoc(reviewCollectionRef, {value: newReviewValue, desc: newReviewDesc, emailUser: email})
                    getReviewList()
                }catch (err){
                    console.log(err)
                }
            }else{
                console.log("utente non loggato - no recensione")
            }
        })
    }

    useEffect(() => {
        getReviewList()
    }, []);

    return(
        <div>
            <div>
                <input placeholder="Valutazione" type="number" onChange={(e) => setNewReviewValue(Number(e.target.value))}/>
                <input placeholder="Descrizione" type="text" onChange={(e) => setNewReviewDesc(e.target.value)}/>
                <button onClick={sendReview}>Invia</button>
            </div>

            <div>
                {reviewList.map((review) => (
                    <div style={{borderStyle: "solid", borderColor:"black"}}>
                        <p>Value: {review.value}</p>
                        <p>Description: {review.desc}</p>
                        <p> User mail: {review.emailUser}</p>
                        <p> id: {review.id}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CRUDReview