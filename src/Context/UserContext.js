import React, { createContext, useState, useEffect } from "react";
import { addUserToFirestore, handleAuthChange } from "../Services/Auth";
import { getDataByID, updateData } from "../Services/operations";

export const userContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userConfig, setUserConfig] = useState(null);
  const [favColor, setFavColor] = useState("pinky");
  const [username, setUsername] = useState("");

  useEffect(async () => {
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

  // useEffect(async () => {
  //   if (user != null) {
  //     const config = await getDataByID("userData", user.uid);
  //     setFavColor(config.favColor);
  //     setUsername(config.username);
  //   }
  // }, []);

  const updateConfig = () => {
    if (username != "") {
      updateData("userData", user.uid, {
        favColor: favColor,
        username: username,
      });
    } else {
      updateData("userData", user.uid, {
        favColor: favColor,
      });
    }
  };

  return (
    <userContext.Provider
      value={{
        user,
        setFavColor,
        setUsername,
        updateConfig,
        username,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
