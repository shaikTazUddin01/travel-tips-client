"use client";
import { Avatar } from "@nextui-org/react";
import { MdOutlineManageHistory, MdWorkspacePremium } from "react-icons/md";
import { FaCreativeCommonsNc, FaUserFriends, FaUsersCog } from "react-icons/fa";
import { RiSecurePaymentLine, RiUserFollowFill } from "react-icons/ri";
import Link from "next/link";

import CreatePostModal from "../../Home/CreatePostModal";

import useUser from "@/src/hooks/user/useShowUser";

const LeftSideBar = () => {
  const { user } = useUser();

  return (
    <div className="px-4 py-3 flex flex-col gap-2 flex-1">
      <Link href={"/profile"}>
        <div className="flex items-center gap-2 p-1 hover:bg-slate-200 rounded-md cursor-pointer">
          <Avatar isBordered radius="full" size="sm" src={user?.image} />
          <div>
            <span>{user?.name}</span>
          </div>
        </div>
      </Link>
      {/* followers */}
      <Link href={"/followers"}>
        <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer ">
          <span className="text-2xl p-1">
            <FaUserFriends />
          </span>
          <span>Followers</span>
        </div>
      </Link>
      {/* following */}
      <Link href={"/following"}>
        <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer">
          <span className="text-2xl p-1">
            <RiUserFollowFill />
          </span>
          <span>Following</span>
        </div>
      </Link>
      {/* saved feed */}
      {/* <Link href={'/saved'}>
      
      <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer">
        <span className="text-2xl p-1"><TbBadgeFilled/></span>
        <span>Saved</span>
      </div>
      </Link> */}
      {/* Premium */}
      <Link href={"/premium"}>
        <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer">
          <span className="text-2xl p-1">
            <MdWorkspacePremium />
          </span>
          <span>Premium</span>
        </div>
      </Link>
      {/* Premium */}
      <Link href={"/non-premium"}>
        <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer">
          <span className="text-2xl p-1">
            <FaCreativeCommonsNc />
          </span>
          <span>Non-Premium</span>
        </div>
      </Link>
      {/* Admin manu */}
      {user?.role == "ADMIN" && (
        <>
          <Link href={"/all-user"}>
            <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer">
              <span className="text-2xl p-1">
                <FaUsersCog />
              </span>
              <span>User Management</span>
            </div>
          </Link>

          <Link href={"/content-management"}>
            <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer">
              <span className="text-2xl p-1">
                <MdOutlineManageHistory />
              </span>
              <span>Content Management</span>
            </div>
          </Link>

          <Link href={"/payment-management"}>
            <div className="gap-2 flex items-center p-1 hover:bg-slate-200 rounded-md cursor-pointer">
              <span className="text-2xl p-1">
                <RiSecurePaymentLine />
              </span>
              <span>Payment Management</span>
            </div>
          </Link>
        </>
      )}
      {/* create Post */}
      <div className="w-full ">
        {/* <Button color="primary" className="w-full rounded-full">Create Post</Button> */}
        <CreatePostModal
          btnClass="rounded-full w-full"
          btnColor="primary"
          buttonText="Create Post"
          variant="solid"
        />
      </div>
    </div>
  );
};

export default LeftSideBar;
