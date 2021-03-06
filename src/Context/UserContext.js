import React, { createContext, useState, useEffect } from "react";
import { addUserToFirestore, handleAuthChange } from "../Services/Auth";
import { updateData } from "../Services/operations";

export const userContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favColor, setFavColor] = useState("pinky");
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState(null);
  const [userColor, setUserColor] = useState("pinkyUser");
  const [bgColor, setBGColor] = useState("pinkyBG");

  useEffect(() => {
    const unsubscribe = handleAuthChange(async (user) => {
      if (user) {
        const config = await addUserToFirestore(user);
        setUser(user);
        setPhoto(user.photoURL);
        setFavColor(config.favColor);
        setUsername(config.username);
      } else {
        setUser(null);
      }
      return () => unsubscribe();
    });
  }, []);

  const updateConfig = () => {
    if (username !== "") {
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

  //Cambiar el color de la app

  useEffect(() => {
    switch (favColor) {
      case "pinky":
        setUserColor("pinkyUser");
        setBGColor("pinkyBG");
        break;
      case "orange":
        setUserColor("orangeUser");
        setBGColor("orangeBG");
        break;
      case "yellow":
        setUserColor("yellowUser");
        setBGColor("yellowBG");
        break;
      case "green":
        setUserColor("greenUser");
        setBGColor("greenBG");
        break;
      case "cyan":
        setUserColor("cyanUser");
        setBGColor("cyanBG");
        break;
      case "purple":
        setUserColor("purpleUser");
        setBGColor("purpleBG");
        break;
      default:
        setUserColor("pinkyUser");
        setBGColor("pinkyBG");
        break;
    }
  }, [favColor]);

  return (
    <userContext.Provider
      value={{
        user,
        userColor,
        bgColor,
        photo,
        favColor,
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
