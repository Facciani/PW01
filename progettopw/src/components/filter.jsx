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
      <>
      {isSet ? (
        <div className="containerFiltro">
          <p>Tipologia di museo:</p>
          <select name="paese" className="custom-select">
            <option value="cl">Classico</option>
            <option value="mo">Moderno</option>
            <option value="co">Contemporaneo</option>
          </select>
        </div>
      ) : (
        <div></div>
      )}
    </>
    );

};

export default Filter;
