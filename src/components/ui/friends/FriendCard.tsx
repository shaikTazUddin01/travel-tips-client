import { TUser } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const FriendCard = ({friend}:{friend:TUser}) => {
  return (
    <div className="w-full px-5 mt-3">
    <div className="flex flex-col md:flex-row items-center justify-center md:items-start md:justify-between gap-2">
      <div className="flex gap-2">
      <Link href={`/${friend?._id}`}>
        <Avatar isBordered radius="full" size="lg" src={friend?.image} />
        </Link>
        <div className="flex flex-col gap-1 items-start justify-center">
        <Link href={`/${friend?._id}`}>
          <h4 className="text-small font-semibold leading-none text-default-700">
            {friend?.name}
          </h4>
          <h4 className="text-small font-semibold leading-none text-default-500 pt-1">
            {friend?.address}
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
        
        >
          UnFriend
        </Button>
        {/* view profile */}
        <Link href={`/${friend?._id}`}>
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

export default FriendCard;
