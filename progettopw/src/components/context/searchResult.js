import { useState, createContext } from "react";

export const useSearchResult = () => {
    const [searchResult, setSearchResult] = useState([]);
    return {searchResult, setSearchResult};
};

export const SearchResultContext = createContext([]);

export const SearchResultProvider = ({ children }) => {
    const { searchResult, setSearchResult } = useSearchResult();
    return (
        <SearchResultContext.Provider value={{searchResult, setSearchResult}}>
            {children}
        </SearchResultContext.Provider>
    );
};
