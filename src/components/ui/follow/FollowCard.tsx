import { Avatar, Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

import { TResponse } from "@/src/types";
import { useMarkFollowingMutation } from "@/src/redux/features/following/followingApi";

const FollowCard = ({ people, pathname, id }: any) => {
  // console.log(id);

  const [makeFollowing] = useMarkFollowingMutation();

  // console.log('--->>',users);
  // Handle following
  const handleFollowing = async (id: string) => {
    // console.log("--->",id);
    const toastId = toast.loading("loading...");
    try {
      const res = (await makeFollowing({ following: id })) as TResponse<any>;
      if (res?.data?.success) {
        toast.success("unfollow", { id: toastId });
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  return (
    <div className="w-full px-5 mt-3">
      <div className="flex flex-col md:flex-row items-center justify-center md:items-start md:justify-between gap-2">
        <div className="flex gap-2">
        <Link href={`/${people._id}`}>
          <Avatar isBordered radius="full" size="lg" src={people?.image} />
          </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
          <Link href={`/${people._id}`}>
            <h4 className="text-small font-semibold leading-none text-default-600">
              {people.name}
            </h4>
            </Link>
            <h5 className="text-small tracking-tight text-default-400">
              {/* @zoeylang */}
            </h5>
          </div>
        </div>
        <div className="flex  gap-2">
          {/* unfollowing */}
          <Button
            className="rounded-full"
            variant="bordered"
            onClick={() => handleFollowing(id)}
          >
            Unfollow
          </Button>
          {/* view profile */}
          <Link href={`/${people._id}`}>
            <Button className="rounded-full" color="primary" variant="flat">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-3">
        <Divider />
      </div>
    </div>
  );
};

export default FollowCard;
