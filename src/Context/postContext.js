import React, { createContext, useEffect, useState } from "react";
import usePost from "../Hooks/usePost";

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

  return (
    <postContext.Provider value={{ posts }}>{children}</postContext.Provider>
  );
}
