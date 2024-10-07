"use client";

import { useAlluserQuery, useGetSingleUserQuery } from "@/src/redux/features/user/userApi";
import MoreProfile from "../moreProfiles/MoreProfile";
import VerifyedProfile from "../moreProfiles/VerifyedProfile";
import { useGetMyFollowingQuery } from "@/src/redux/features/following/followingApi";
import useUser from "@/src/hooks/user/useShowUser";
import { TUser } from "@/src/types";
import ShowMoreProfileLoading from "../LoadingSkeleton/ShowMoreProfileLoading";
import { Button } from "@nextui-org/button";
import VerifyAccount from "../verifyAccount/VerifyAccount";

const RightSideBar = () => {
  const { data: allUsers, isLoading } = useAlluserQuery(undefined);
  const { data: myFollowing, isLoading: followingLoading } =
    useGetMyFollowingQuery(undefined);
  const { user: myData} = useUser();
  // get single user account
  const {data:myInfo}=useGetSingleUserQuery(myData?.userId as string)
  

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
      {myInfo?.data?.isVerify ? (
        ""
      ) : (
        <VerifyAccount/>
      )}
      <div>
        {isLoading ? (
          <ShowMoreProfileLoading />
        ) : (
          allUserWithoutMeOrFollowing?.length > 0 && (
            <MoreProfile users={allUserWithoutMeOrFollowing} />
          )
        )}
      </div>
      <div>
        <VerifyedProfile />
      </div>
    </div>
  );
};

export default RightSideBar;
