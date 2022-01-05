import React, { createContext, useState, useEffect } from "react";
import { addUserToFirestore, handleAuthChange } from "../Services/Auth";

export const userContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = handleAuthChange((user) => {
      if (user) {
        addUserToFirestore(user);
        setUser(user);
      } else {
        setUser(null);
      }
      return () => unsubscribe();
    });
  }, []);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}
