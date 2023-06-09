import { useState, createContext } from "react";

export const useSearch = () => {
    const [search, setSearch] = useState("");
    const [searchDistance, setSearchDistance] = useState(null);
    return {search, setSearch, searchDistance, setSearchDistance};
};

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
    const { search, setSearch, searchDistance, setSearchDistance} = useSearch();
    return (
        <SearchContext.Provider value={{search, setSearch, searchDistance, setSearchDistance}}>
            {children}
        </SearchContext.Provider>
    );
};
