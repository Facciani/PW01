import {signOut} from "firebase/auth";
import {auth} from "../../ProvaGeneral/config/dbconfig";
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const logout = () => {
        signOut(auth).then(() => {
            console.log("Logout successfully")
            navigate("/login")
        }).catch((error) => {
            console.log(error.code, error.message)
        });
    }

    return(
        <div>
            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default Logout