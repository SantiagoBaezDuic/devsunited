import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [postFetch, setPostFetch] = useState(false);
    const [userData, setUserData] = useState({});
    
    const getPosts = async () => {
        await fetch("https://jsonplaceholder.typicode.com/comments?_limit=25")
        .then((response) => response.json())
        .then((data => setPosts(data)))
        .then(() => setPostFetch(true))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        getPosts()
    }, []);

    return (
        <AppContext.Provider value={{posts, postFetch, userData, setUserData}}>
            {children}
        </AppContext.Provider>
    );
}




