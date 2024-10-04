"use client";
import useUser from "@/src/hooks/user/useShowUser";
import { useMarkFollowingMutation } from "@/src/redux/features/following/followingApi";
import { useAlluserQuery } from "@/src/redux/features/user/userApi";
import { TResponse, TUser } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "sonner";

const MoreProfile = () => {
  // setfollowing state
  // const [isFollowed, setIsFollowed] = React.useState(false);
  const { data: allUsers, isLoading } = useAlluserQuery(undefined);
  const [ makeFollowing ] = useMarkFollowingMutation();
  const { user: myData } = useUser();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  // user fillter
  const allUserWithoutMe = allUsers?.data?.filter(
    (user: TUser) => user?._id !== myData?.userId
  );

  // handle following
  const handleFollowing = async (id: string) => {
    // console.log("userid-->", id);
    const toastId=toast.loading("loading...")
    try {
      const res = (await makeFollowing({ following: id })) as TResponse<any>;
      console.log(res);
      if (res?.data) {
        toast.success("Following",{id:toastId});
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.message,{id:toastId});
    }
  };

  return (
    <div className="border rounded-xl shadow-md min-h-[250px] px-3 py-3">
      <h1 className="text-lg">More profiles for you</h1>

      {/* profile */}
      <div className="mt-5">
        {allUserWithoutMe &&
          allUserWithoutMe?.map((user: TUser) => {
            return (
              <div className="flex justify-between mb-4" key={user?._id}>
                <div className="flex gap-3">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={user?.image}
                  />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-sm font-semibold leading-none text-default-600">
                      {user?.name}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                      @zoeylang
                    </h5>
                  </div>
                </div>
                <Button
                  className={"border-default-200"}
                  color="primary"
                  radius="full"
                  size="sm"
                  // variant={isFollowed ? "bordered" : "solid"}
                  onClick={() => {
                    handleFollowing(user?._id);
                  }}
                >
                  {/* {isFollowed ? "Unfollow" : "Follow"} */}
                  Follow
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MoreProfile;
