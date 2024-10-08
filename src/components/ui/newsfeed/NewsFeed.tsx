"use client";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";
import NewsFeedCard from "./Card";
import { useGetPostQuery } from "@/src/redux/features/post/postApi";
import { TPost } from "@/src/types";
import { useAppSelector } from "@/src/redux/hooks";

const NewsFeed = () => {
  const category = useAppSelector((state) => state.queryOperation.category);
  const search = useAppSelector((state) => state.queryOperation.search);
  // const sorting = useAppSelector((state) => state.queryOperation.sorting);
  const type = useAppSelector((state) => state.queryOperation.type);

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: postData,
    isError,
    isLoading,
    isFetching,
  } = useGetPostQuery({ category, search, type ,page});

  useEffect(() => {
    if (postData?.data) {
      if (page === 1) {
        setPosts(postData.data); 
      } else {
        setPosts((prevPosts) => [...prevPosts, ...postData.data]); 
      }

      if (postData.data.length === 0) {
        setHasMore(false); 
      }
    }
  }, [postData]);

  useEffect(() => {
    setPage(1); 
    setHasMore(true); 
    setPosts([]); 
  }, [category, search, type]); 

  const fetchMorePosts = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page for next set of data
    }
  };

  // console.log(page);
  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<LoadingSkeleton />} 
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You&#39;ve seen it all</b>
          </p>
        }
      >
        {posts.map((data: TPost,idx) => (
          <div key={idx}>
            <NewsFeedCard postItem={data} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default NewsFeed;
