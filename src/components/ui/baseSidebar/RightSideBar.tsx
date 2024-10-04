"use client";

import { useAlluserQuery } from "@/src/redux/features/user/userApi";
import MoreProfile from "../moreProfiles/MoreProfile";
import VerifyedProfile from "../moreProfiles/VerifyedProfile";
import { useGetMyFollowingQuery } from "@/src/redux/features/following/followingApi";
import useUser from "@/src/hooks/user/useShowUser";
import { TUser } from "@/src/types";
import ShowMoreProfileLoading from "../LoadingSkeleton/ShowMoreProfileLoading";

const RightSideBar = () => {
  const { data: allUsers, isLoading } = useAlluserQuery(undefined);
  const { data: myFollowing, isLoading: followingLoading } =
    useGetMyFollowingQuery(undefined);
  const { user: myData } = useUser();

  const followedUserIds = myFollowing?.data?.following || [];
  // Filter out the current logged-in user and users already followed
  const allUserWithoutMeOrFollowing = allUsers?.data?.filter(
    (user: TUser) =>
      user?._id !== myData?.userId && !followedUserIds.includes(user?._id)
  );

  return (
    <div>
      <div>
        {isLoading
          ? Array(5).fill(null).map((_, index) => (
                <div key={index}>
                  <ShowMoreProfileLoading />
                </div>
              ))
          : allUserWithoutMeOrFollowing?.length > 0 && <MoreProfile users={allUserWithoutMeOrFollowing}/>}
      </div>
      <div>
        <VerifyedProfile />
      </div>
    </div>
  );
};

export default RightSideBar;
