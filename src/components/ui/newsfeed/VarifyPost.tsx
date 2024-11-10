import React from "react";
import NewsFeedCard from "./Card";
import { TPost } from "@/src/types";
import SharedPostCard from "./SharedPostCard";

const FilterPost = ({ postItem }: { postItem: TPost }) => {
  return (
    <div>
      {postItem?.isThisPostShare ? (
        <SharedPostCard postItem={postItem} />
      ) : (
        <NewsFeedCard postItem={postItem} />
      )}
    </div>
  );
};

export default FilterPost;
