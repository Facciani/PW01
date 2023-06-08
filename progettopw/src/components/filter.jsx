import { useContext, useEffect, useState } from "react";
import { SearchResultContext } from "./context/searchResult";

const Filter = () => {
  const { searchResult, setSearchResult } = useContext(SearchResultContext);

  const [isSet, setisSet] = useState(false);

  useEffect(() => {
    if (searchResult.length === 0) {
      setisSet(false);
    } else {
      setisSet(true);
    }
  }, [searchResult]);

  return (
    <div>
      {isSet ? (
        <div>
          <h3 style={{ fontWeight: "bold", fontSize: "1.1em" }} >FILTRI</h3>
          <p style={{ fontSize: "1.1em" }}>Tipologia di museo</p>
          <p>{isSet}</p>
          <select name="paese" class="custom-select" >
            <option value="cl" style={{ fontWeight: "bold"}}>Classico</option>
            <option value="mo" style={{ fontWeight: "bold"}}>Moderno</option>
            <option value="co" style={{ fontWeight: "bold"}}>Contemporaneo</option>
          </select>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Filter;
