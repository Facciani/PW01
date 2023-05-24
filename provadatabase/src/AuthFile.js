import React, {useState, useEffect} from "react";
import {Auth} from "./components/auth";

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        Auth.onAuthStateChanged(setCurrentUser)
    }, []);

    return(
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}