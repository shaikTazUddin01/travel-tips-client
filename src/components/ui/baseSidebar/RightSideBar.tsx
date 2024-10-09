"use client";

import MoreProfile from "../moreProfiles/MoreProfile";
import ShowMoreProfileLoading from "../LoadingSkeleton/ShowMoreProfileLoading";
import VerifyAccount from "../verifyAccount/VerifyAccount";

import {
  useAlluserQuery,
  useGetSingleUserQuery,
} from "@/src/redux/features/user/userApi";
import { useGetMyFollowingQuery } from "@/src/redux/features/following/followingApi";
import useUser from "@/src/hooks/user/useShowUser";
import { TUser } from "@/src/types";
import PostCategories from "../newsfeed/PostCategories";
import { Select, SelectItem } from "@nextui-org/react";
import { sortIngOptions } from "@/src/constant/options";
import Sorting from "@/src/lib/queryOperation/Sorting";
import CategoryFilter from "@/src/lib/queryOperation/CategoryFilter";

const RightSideBar = () => {
  const { data: allUsers, isLoading } = useAlluserQuery(undefined);
  const { data: myFollowing, isLoading: followingLoading } =
    useGetMyFollowingQuery(undefined);
  const { user: myData } = useUser();
  // get single user account
  const { data: myInfo } = useGetSingleUserQuery(myData?.userId as string);

  const followedUserIds =
    myFollowing?.data?.following?.map((item: TUser) => {
      return item?._id;
    }) || [];
  // console.log('object---',followedUserIds);
  // Filter out the current logged-in user and users already followed
  const allUserWithoutMeOrFollowing = allUsers?.data?.filter(
    (user: TUser) =>
      user?._id !== myData?.userId && !followedUserIds.includes(user?._id)
  );

  // console.log("user--->", myData);

  return (
    <div>
      {/* sorting */}
      <Sorting/>
      {myInfo?.data?.isVerify ? "" : <VerifyAccount />}
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
