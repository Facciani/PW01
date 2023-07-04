import { useState, createContext } from "react";

export const useIdArtista = () => {
    const [idArtista, setIdArtista] = useState("");
    return {idArtista, setIdArtista};
};

export const IdArtistaContext = createContext("");

export const IdArtistaProvider = ({ children }) => {
    const { idArtista, setIdArtista } = useIdArtista();
    return (
        <IdArtistaContext.Provider value={{idArtista, setIdArtista}}>
            {children}
        </IdArtistaContext.Provider>
    );
};
