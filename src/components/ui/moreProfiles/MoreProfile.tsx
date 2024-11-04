"use client";
import { Avatar, Link } from "@nextui-org/react";
import { BiSolidBadgeCheck } from "react-icons/bi";

import { TUser } from "@/src/types";
import Follow from "../followingProcess/Follow";

const MoreProfile = ({ users }: any) => {
  // console.log('--->>',users);

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
                  <Link href={`/${user?._id}`}>
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={user?.image}
                    />
                  </Link>
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-sm font-semibold leading-none text-default-600 flex">
                      <Link href={`/${user?._id}`} className="text-default-800">
                        <span>{user?.name}</span>
                      </Link>
                      <span className="text-blue-600 text-[10px]">
                        {user?.isVerify && <BiSolidBadgeCheck />}
                      </span>
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                      {/* @dfsyhdstyte */}
                    </h5>
                  </div>
                </div>
                <Follow userId={user?._id} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MoreProfile;
