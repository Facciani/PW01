import {useContext, useEffect, useState} from "react";
import {SearchResultContext} from "./context/searchResult";

const Filter = () => {


    const { searchResult, setSearchResult } = useContext(SearchResultContext);

    const [isSet, setisSet] = useState(false)

    useEffect(()=>{
        if(searchResult.length === 0){
            setisSet(false)
        }else{
            setisSet(true)
        }
    }, [searchResult])



    return (
        <div>
            {isSet ? <div>
                <h3>FILTRI</h3>
                <p>
                    {isSet}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi autem
                    minima dolor deserunt sed nobis numquam aspernatur ullam, explicabo
                    vero assumenda laudantium itaque ex maxime voluptatum! Quo ipsam
                    nesciuntrepellat?
                </p>
            </div> : <div></div>}
        </div>
    )
}

export default Filter