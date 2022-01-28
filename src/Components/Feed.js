import { useContext } from "react";
import "../CSS/post-card.css";
import "../CSS/Feed.css";
import { postContext } from "../Context/postContext";
import TweetCard from "./TweetCard";
import FeedHeader from "./FeedHeader";
import TweetInput from "./TweetInput";
import Overlay from "./Overlay";

export default function Feed() {
  const { posts, confirm } = useContext(postContext);

  return (
    <>
      {confirm ? <Overlay /> : null}
      <FeedHeader />
      <TweetInput />
      <div className="feed">
        {posts.length > 0 ? (
          posts.map((object) => {
            return <TweetCard object={object} />;
          })
        ) : (
          <p className="press-start loading">Posts are loading...</p>
        )}
      </div>
    </>
  );
}
