import React, { useContext } from "react";
import { postContext } from "../Context/postContext";
import "../CSS/Profile.css";
import TweetCard from "./TweetCard";
import ProfileHeader from "./ProfileHeader";
import UserDisplay from "./UserDisplay";

export default function Profile() {
  const { showPosts, ownPosts, likedPosts } = useContext(postContext);

  return (
    <>
      <ProfileHeader />
      <UserDisplay />
      <div className="feed">
        {showPosts
          ? ownPosts.map((object) => {
              return <TweetCard object={object} />;
            })
          : likedPosts.map((object) => {
              return <TweetCard object={object} />;
            })}
      </div>
    </>
  );
}
