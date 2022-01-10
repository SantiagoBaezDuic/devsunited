import React, { createContext, useEffect, useState } from "react";
import usePost from "../Hooks/usePost";
import { options } from "./config";
import { deleteTweet } from "../Services/operations";

export const postContext = createContext();

export default function PostProvider({ children }) {
  const fetchedPosts = usePost();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const posts = fetchedPosts.sort((a, b) => {
      if (a.time < b.time) {
        return 1;
      }
      if (a.time > b.time) {
        return -1;
      }
      return 0;
    });
    setPosts(posts);
  }, [fetchedPosts]);

  //Conversor de unix a dia/mes

  const convertTime = (unix) => {
    const readableDate = new Date(unix).toLocaleString("es-AR", options);
    return readableDate;
  };

  //Borrar tweet por id

  const handleDelete = (id) => {
    deleteTweet("tuits", id);
  };

  return (
    <postContext.Provider value={{ posts, convertTime, handleDelete }}>
      {children}
    </postContext.Provider>
  );
}
