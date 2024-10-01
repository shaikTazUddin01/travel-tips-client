"use client";
import { Avatar } from "@nextui-org/react";
import { MdWorkspacePremium } from "react-icons/md";
import { FaCreativeCommonsNc, FaUserFriends } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import { TbBadgeFilled } from "react-icons/tb";

const LeftSideBar = () => {
  return (
    <div className="px-4 py-3 flex flex-col gap-2">
      <div className="flex items-center gap-2 p-1 hover:bg-slate-200 rounded-md cursor-pointer">
        <Avatar
          isBordered
          radius="full"
          size="sm"
          src="https://nextui.org/avatars/avatar-1.png"
        />
        <div>
          <span>Taz Ahmed</span>
        </div>
      </div>
      {/* followers */}
      <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer ">
        <span className="text-2xl p-1"><FaUserFriends/></span>
        <span>Followers</span>
      </div>
      {/* following */}
      <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer">
        <span className="text-2xl p-1"><RiUserFollowFill/></span>
        <span>Following</span>
      </div>
      {/* saved feed */}
      <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer">
        <span className="text-2xl p-1"><TbBadgeFilled/></span>
        <span>Saved</span>
      </div>
      {/* Premium */}
      <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer">
        <span className="text-2xl p-1"><MdWorkspacePremium/></span>
        <span>Premium</span>
      </div>
      {/* Premium */}
      <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer">
        <span className="text-2xl p-1"><FaCreativeCommonsNc/></span>
        <span>Non-Premium</span>
      </div>
    </div>
  );
};

export default LeftSideBar;
