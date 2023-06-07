import { useState, createContext } from "react";

export const useSearch = () => {
    const [search, setSearch] = useState("");
    return {search, setSearch};
};

export const SearchContext = createContext("");

export const SearchProvider = ({ children }) => {
    const { search, setSearch } = useSearch();
    return (
        <SearchContext.Provider value={{search, setSearch}}>
            {children}
        </SearchContext.Provider>
    );
};
