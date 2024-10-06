"use client";
import { useGetPostQuery } from "@/src/redux/features/post/postApi";
import { TPost } from "@/src/types";
import React from "react";
import NewsFeedCard from "./Card";
import LoadingSkeletor from "../LoadingSkeleton/LoadingSkeleton";

const NewsFeed = () => {
  const {
    data: postData,
    isError,
    isLoading,
    isFetching,
  } = useGetPostQuery(undefined);

  // console.log("postData-->", postData);
  return (
    <div>
      {isLoading
        ? Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index}>
                <LoadingSkeletor />
              </div>
            ))
        : postData?.data?.map((data: TPost) => {
            return (
              <div key={data?._id}>
                <NewsFeedCard postItem={data} />
              </div>
            );
          })}
    </div>
  );
};

export default NewsFeed;
