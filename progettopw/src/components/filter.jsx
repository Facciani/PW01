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
          <h3>FILTRI</h3>
          <p>{isSet}</p>
          <select name="paese">
            <option value="I">Italia</option>
            <option value="E">Estero</option>
          </select>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Filter;
