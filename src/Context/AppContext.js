import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState({});
    const [userID, setUserID] = useState("");

    return (
        <AppContext.Provider value={{posts, setPosts, userData, setUserData, userID, setUserID}}>
            {children}
        </AppContext.Provider>
    );
}