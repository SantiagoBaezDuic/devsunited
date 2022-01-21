import React, { createContext, useEffect, useState, useContext } from "react";
import usePost from "../Hooks/usePost";
import { options } from "./config";
import { deleteTweet, getDataByID, updateData } from "../Services/operations";
import { userContext } from "../Context/UserContext";

export const postContext = createContext();

export default function PostProvider({ children }) {
  const fetchedPosts = usePost();
  const [posts, setPosts] = useState([]);
  const [showPosts, setShowPosts] = useState(true);

  const { user } = useContext(userContext);

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

  // Manejo de Likes

  const globalHandleLike = async (tweet) => {
    const uid = user.uid;

    //Referencia del doc del tuit

    const docRef = await getDataByID("tuits", tweet.id);

    //Referencia del doc del usuario

    const userRef = await getDataByID("userData", uid);

    //Chequea si el tuit está likeado por el usuario logeado

    if (docRef.likedBy.find((object) => object === uid) === undefined) {
      //Caso negativo agrega el usuario al tuit y viceversa

      await updateData("tuits", tweet.id, {
        likes: tweet.likes + 1,
        likedBy: [...docRef.likedBy, uid],
      });
      await updateData("userData", uid, {
        likedTweets: [...userRef.likedTweets, tweet.id],
      });
    } else {
      //Filtrado de las listas para borrar el tuit y el usuario

      const filteredLikes = docRef.likedBy.filter((object) => {
        return object !== uid;
      });
      const filteredUser = userRef.likedTweets.filter((object) => {
        return object !== tweet.id;
      });
      //Caso positivo borra el usuario del tuit y viceversa

      await updateData("tuits", tweet.id, {
        likes: tweet.likes - 1,
        likedBy: filteredLikes,
      });
      await updateData("userData", uid, {
        likedTweets: filteredUser,
      });
    }
  };

  //Manejo del booleano que decide si se muestran los tweets propios o los faveados

  const handlePosts = () => {
    setShowPosts(true);
  };

  const handleFavs = () => {
    setShowPosts(false);
  };

  //Filtrado de tweets

  //Propios

  let ownPosts = posts.filter((object) => {
    let own = [];
    if (user) {
      own = object.uid === user.uid;
    }
    return own;
  });

  //Faveados

  let likedPosts = posts.filter((object) => {
    let liked = [];
    if (user) {
      liked =
        object.likedBy.find((element) => element === user.uid) !== undefined;
    }
    return liked;
  });

  return (
    <postContext.Provider
      value={{
        posts,
        likedPosts,
        ownPosts,
        convertTime,
        handleDelete,
        globalHandleLike,
        handlePosts,
        handleFavs,
        showPosts,
      }}
    >
      {children}
    </postContext.Provider>
  );
}
