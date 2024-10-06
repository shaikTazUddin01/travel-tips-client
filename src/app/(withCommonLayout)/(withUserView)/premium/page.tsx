"use client";
import CreatePost from "@/src/components/Home/CreatePost";
import NewsFeedCard from "@/src/components/ui/newsfeed/Card";
import LoadingSkeletor from "@/src/components/ui/LoadingSkeleton/LoadingSkeleton";
import { useGetPostQuery } from "@/src/redux/features/post/postApi";
import { TPost } from "@/src/types";
import React from "react";

const PremiumContent = () => {
  const {
    data: postData,
    isError,
    isLoading,
    isFetching,
  } = useGetPostQuery("Premium");

  console.log("postData-->", postData);
  return (
    <div>
      <div>
        <CreatePost />
      </div>
      <div className="mt-5">
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
    </div>
  );
};

export default PremiumContent;