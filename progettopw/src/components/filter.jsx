import { useContext, useEffect, useState } from "react";
import { SearchResultContext } from "./context/searchResult";
import {FilterContext} from "./context/filterContext";

const Filter = () => {
  const { searchResult, setSearchResult } = useContext(SearchResultContext);

  const {filter , setFilter} = useContext(FilterContext)

  const [isSet, setisSet] = useState(false);

  useEffect(() => {
    if (searchResult.length === 0) {
      setisSet(false);
    } else {
      setisSet(true);
    }
  }, [searchResult]);



    return (
      <>
      {isSet ? (
        <div className="containerFiltro">
          <p>Tipologia di museo:</p>
          <select className="custom-select" name="paese"
              onChange={(e)=>{
                const selectedFood = e.target.value;
                setFilter(selectedFood);
              }}>
            <option value="none"></option>
            <option value="classico">Classico</option>
            <option value="moderno">Moderno</option>
            <option value="contemporaneo">Contemporaneo</option>
          </select>
        </div>
      ) : (
        <div></div>
      )}
    </>
    );

};

export default Filter;
