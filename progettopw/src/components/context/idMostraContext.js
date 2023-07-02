import { useState, createContext } from "react";

export const useIdMostra = () => {
    const [idMostra, setIdMostra] = useState("");
    return {idMostra, setIdMostra};
};

export const IdMostraContext = createContext("");

export const IdMostraProvider = ({ children }) => {
    const { idMostra, setIdMostra } = useIdMostra();
    return (
        <IdMostraContext.Provider value={{idMostra, setIdMostra}}>
            {children}
        </IdMostraContext.Provider>
    );
};
