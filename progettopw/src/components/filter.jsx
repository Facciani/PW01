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
        <div className="div1">
          <h3 style={{ fontWeight: "bold", fontSize: "1.3em" }}>FILTRI</h3>
          <p style={{ fontSize: "1.1em", display: "inline-block" }}>
            Tipologia di museo:
          </p>
          <select name="paese" className="custom-select" style={{ display: "inline-block", marginLeft: "10px", fontWeight: "bold" }}>
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
