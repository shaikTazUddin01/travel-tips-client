"use client";


import { useEffect, useState } from "react";

import MoreProfile from "../moreProfiles/MoreProfile";
import ShowMoreProfileLoading from "../LoadingSkeleton/ShowMoreProfileLoading";
import VerifyAccount from "../verifyAccount/VerifyAccount";

import {
  useAlluserQuery,
  useGetSingleUserQuery,
} from "@/src/redux/features/user/userApi";
import { useGetMyFollowingQuery } from "@/src/redux/features/following/followingApi";
import useUser from "@/src/hooks/user/useShowUser";
import { TPost, TUser } from "@/src/types";
import Sorting from "@/src/lib/queryOperation/Sorting";
import CategoryFilter from "@/src/lib/queryOperation/CategoryFilter";
import { useGetMyPostQuery } from "@/src/redux/features/post/postApi";


const RightSideBar = () => {
  const { data: allUsers, isLoading } = useAlluserQuery(undefined);
  const { data: myFollowing, isLoading: followingLoading } =
    useGetMyFollowingQuery(undefined);
  const { user: myData } = useUser();
  // get single user account
  const { data: myInfo } = useGetSingleUserQuery(myData?.userId as string);
  const { data: mypost,isLoading:myPostLoading} = useGetMyPostQuery(undefined);

  const [totallike,setTotalLike]=useState(0)
  const followedUserIds =
    myFollowing?.data?.following?.map((item: TUser) => {
      return item?._id;
    }) || [];
  
  // Filter out the current logged-in user and users already followed
  const allUserWithoutMeOrFollowing = allUsers?.data?.filter(
    (user: TUser) =>
      user?._id !== myData?.userId && !followedUserIds.includes(user?._id)
  );
// total like count
  // let totallikeCount

  useEffect(() => {
    if (!myPostLoading) {
      const totallikeCount = mypost?.data?.reduce(
        (acc: number, cur: TPost) => acc + (cur?.like?.length || 0),
        0
      );
      setTotalLike(totallikeCount);
    }
  }, [myPostLoading, mypost]);
  // console.log(totallike);
  // console.log("user--->", myData);

  return (
    <div className="w-full">
      {/* sorting */}
      <Sorting />
      {myInfo?.data?.isVerify==false && totallike>0  &&  <VerifyAccount />}
      <div className="mb-2">
        <CategoryFilter />
      </div>
      <div>
        {isLoading ? (
          <ShowMoreProfileLoading />
        ) : (
          allUserWithoutMeOrFollowing?.length > 0 && (
            <MoreProfile users={allUserWithoutMeOrFollowing} />
          )
        )}
      </div>
      <div>{/* <VerifyedProfile /> */}</div>
    </div>
  );
};

export default RightSideBar;
