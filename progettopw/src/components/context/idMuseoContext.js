import { useState, createContext } from "react";

export const useIdMuseo = () => {
    const [idMuseo, setIdMuseo] = useState("");
    return {idMuseo, setIdMuseo};
};

export const IdMuseoContext = createContext("");

export const IdMuseoProvider = ({ children }) => {
    const { idMuseo, setIdMuseo } = useIdMuseo();
    return (
        <IdMuseoContext.Provider value={{idMuseo, setIdMuseo}}>
            {children}
        </IdMuseoContext.Provider>
    );
};
