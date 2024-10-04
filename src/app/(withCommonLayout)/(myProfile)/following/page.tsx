"use client";
import FollowCard from "@/src/components/ui/follow/FollowCard";
import { useGetMyFollowingQuery } from "@/src/redux/features/following/followingApi";
import { Divider } from "@nextui-org/divider";
import React from "react";

const MyFollowing = () => {
  const {data,isLoading}=useGetMyFollowingQuery(undefined)
  if (isLoading) {
return <p>Loading...</p>
  }
  console.log("--->",data?.data);
  return (
    <div>
      <div className="border-1  w-full rounded-xl">
        <div className="p-4">
          <h1>271 Followers</h1>
        </div>
        <Divider />
        {/* followers */}
        <div className="mt-2">
       <FollowCard/>
       <FollowCard/>
       <FollowCard/>
       <FollowCard/>
       <FollowCard/>
       <FollowCard/>
       <FollowCard/>
       <FollowCard/>
        </div>
      </div>
    </div>
  );
};

export default MyFollowing;
