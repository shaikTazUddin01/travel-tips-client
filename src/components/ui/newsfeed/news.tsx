"use client";
import React from "react";

import LoadingSkeletor from "../LoadingSkeleton/LoadingSkeleton";

import NewsFeedCard from "./Card";

import { useGetPostQuery } from "@/src/redux/features/post/postApi";
import { TPost } from "@/src/types";
import { useAppSelector } from "@/src/redux/hooks";
import InfiniteScroll from 'react-infinite-scroll-component';

const NewsFeed = () => {
  const category=useAppSelector(state=>state.queryOperation.category)
  const search=useAppSelector(state=>state.queryOperation.search)
  const sorting=useAppSelector(state=>state.queryOperation.sorting)
  const type=useAppSelector(state=>state.queryOperation.type)
  
  
  const {
    data: postData,
    isError,
    isLoading,
    isFetching,
  } = useGetPostQuery({category,search,type});



  
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
