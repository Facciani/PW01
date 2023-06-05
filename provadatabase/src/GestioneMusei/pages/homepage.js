import {GetMusei} from "../components/museo";
import {useNavigate} from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();

    return(
        <div>
            <GetMusei/>
        </div>
    )
}

export default Homepage