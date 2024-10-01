"use client";
import FollowCard from "@/src/components/ui/follow/FollowCard";
import { Divider } from "@nextui-org/divider";
import React from "react";

const page = () => {
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

export default page;
