import { useState, useEffect } from "react";
import { getSubscription } from "../Services/operations";

const usePost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = getSubscription("tuits", (snapData) => {
            const postData = snapData.docs.map((doc) =>  {
                return {...doc.data(), id: doc.id}})
                setPosts(postData);
        });
        return () => unsubscribe();
    }, [])

    return posts;
}

export default usePost;