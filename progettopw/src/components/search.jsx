import { useState, useEffect, useContext } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "./dbconfig/dbconfig";
import { SearchContext } from "./context/searchContext";
import { YourLocationContext } from "./context/yourlocationContext";

const Search = () => {
  const { search, setSearch, searchDistance, setSearchDistance } = useContext(
    SearchContext
  );
  const { lat, lon } = useContext(YourLocationContext);

  return (
    <div className="form-container">
      <div className="form-box">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="campo1" className="form-label">
              CITTA'
            </label>
            <input
              type="text"
              id="campo1"
              placeholder="City"
              className="input-field"
              value={search}
              onChange={(event) => setSearch(event.target.value.toLowerCase())}
            />
          </div>
          <div className="form-field">
            <label htmlFor="campo2" className="form-label">
              DISTANZA
            </label>
            <input
              type="number"
              id="campo2"
              placeholder="Distance"
              className="input-field"
              onChange={(event) => setSearchDistance(event.target.value)}
              value={searchDistance}
              disabled={lat === ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
