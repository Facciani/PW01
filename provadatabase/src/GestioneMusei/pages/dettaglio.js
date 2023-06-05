import { useLocation, Link } from "react-router-dom";
import {InfoMuseo} from "../components/museo";

const Dettaglio = () => {
    const location = useLocation();
    const state = location.state;

    return (
        <div>
            <InfoMuseo element = {state}/>
        </div>
    )

}

export default Dettaglio