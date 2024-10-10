"use client";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/react";
import { toast } from "sonner";
import { BiSolidBadgeCheck } from "react-icons/bi";

import { TResponse, TUser } from "@/src/types";
import {
  useMarkFollowingMutation,
} from "@/src/redux/features/following/followingApi";

const MoreProfile = ({users}:any) => {
  
  const [makeFollowing] = useMarkFollowingMutation();

console.log('--->>',users);
  // Handle following
  const handleFollowing = async (id: string) => {
    const toastId = toast.loading("loading...");
    try {
      const res = (await makeFollowing({ following: id })) as TResponse<any>;
      if (res?.data?.success) {
        toast.success("Following", { id: toastId });
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  return (
    
        <div className="border rounded-xl shadow-md min-h-[250px] px-3 py-3">
          <h1 className="text-lg">More profiles for you</h1>
          {/* Profile list */}
          <div className="mt-5">
            {users &&
              users?.map((user: TUser) => {
                return (
                  <div key={user?._id} className="flex justify-between mb-4">
                    <div className="flex gap-2">
                      <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src={user?.image}
                      />
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-sm font-semibold leading-none text-default-600 flex">
                          <span>
                          {user?.name}
                          </span>
                          <span className="text-blue-600 text-[10px]">
                          {
                            user?.isVerify &&
                            <BiSolidBadgeCheck />
                          }
                          </span>
                        </h4>
                        <h5 className="text-small tracking-tight text-default-400">
                          {/* @dfsyhdstyte */}
                        </h5>
                      </div>
                    </div>
                    <Button
                      className={"border-default-200"}
                      color="primary"
                      radius="full"
                      size="sm"
                      onClick={() => handleFollowing(user?._id)}
                    >
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
