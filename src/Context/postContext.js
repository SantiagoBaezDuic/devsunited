import React, { createContext } from "react";
import usePost from "../Hooks/usePost";

export const postContext = createContext();

export default function PostProvider({ children }) {
  const posts = usePost();

  return (
    <postContext.Provider value={{ posts }}>{children}</postContext.Provider>
  );
}
