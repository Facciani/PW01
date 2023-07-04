import { useState, createContext } from "react";

export const useFilter = () => {
    const [filter, setFilter] = useState("none");
    return {filter, setFilter};
};

export const FilterContext = createContext("none");

export const FilterProvider = ({ children }) => {
    const { filter, setFilter } = useFilter();
    return (
        <FilterContext.Provider value={{filter, setFilter}}>
            {children}
        </FilterContext.Provider>
    );
};
