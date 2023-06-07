import { useState, createContext } from "react";

export const useYourLocation = () => {

    const [lat, setLan] = useState("");
    const [lon, setLon] = useState("");

    navigator.geolocation.getCurrentPosition(function(position) {
        setLan(position.coords.latitude);
        setLon(position.coords.longitude);
    });

    return {lat, lon};
};

export const YourLocationContext = createContext("");

export const YourLocationProvider = ({ children }) => {
    const { lat, lon } = useYourLocation();
    return (
        <YourLocationContext.Provider value={{lat, lon}}>
            {children}
        </YourLocationContext.Provider>
    );
};
