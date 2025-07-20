"use client";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

import NewsFeedCard from "./Card";

import { useGetPostQuery } from "@/src/redux/features/post/postApi";
import { TPost } from "@/src/types";
import { useAppSelector } from "@/src/redux/hooks";
import FilterPost from "./VarifyPost";

const NewsFeed = () => {
  const category = useAppSelector((state) => state.queryOperation.category);
  const search = useAppSelector((state) => state.queryOperation.search);
  const sorting = useAppSelector((state) => state.queryOperation.sorting);
  const type = useAppSelector((state) => state.queryOperation.type);

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: postData,
    isError,
    isLoading,
    isFetching,
  } = useGetPostQuery({ category, search, sorting, type, page });

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
      setPage((prevPage) => prevPage + 1);
    }
  };

  // console.log(page);
  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No data found.!</b>
          </p>
        }
        hasMore={hasMore}
        loader={<LoadingSkeleton />}
        next={fetchMorePosts}
      >
        {posts.map((data: TPost, idx) => (
          <div key={idx}>
            <FilterPost postItem={data} />
            {/* <NewsFeedCard postItem={data} /> */}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default NewsFeed;
