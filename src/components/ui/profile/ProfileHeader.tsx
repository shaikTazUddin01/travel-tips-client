"use client";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";

import CreatePostModal from "../../Home/CreatePostModal";

import EditProfile from "./EditProfile";
import EditImage from "./EditImage";

import { useGetSingleUserQuery } from "@/src/redux/features/user/userApi";
import useUser from "@/src/hooks/user/useShowUser";
import bg from "@/src/assets/login1.jpg";
import { useGetMyFollowersQuery } from "@/src/redux/features/followers/followersAPi";
import { useGetMyFollowingQuery } from "@/src/redux/features/following/followingApi";

const ProfileHeader = () => {
  const { user } = useUser();
  //   get user Data
  const { data: userData } = useGetSingleUserQuery(user?.userId as string);
  //   get my followers
  const { data: myfollowers } = useGetMyFollowersQuery(undefined);
  const { data: following } = useGetMyFollowingQuery(undefined);
  const userInFo = userData?.data;

  return (
    <div className="relative ">
      <div
        className="h-[250px] w-100% bg-stone-200 rounded-xl object-cover bg-cover"
        style={{ backgroundImage: `url(${bg.src})` }}
      />

      <div className="-mt-5 lg:mx-5">
        <div className="flex flex-col md:flex-row gap-1 items-center">
          <EditImage user={userInFo} />

          <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-start flex-1 w-full">
            <div className="text-center md:text-left">
              <h1 className="font-medium text-xl">{userInFo?.name}</h1>
              {/* <p className="text-sm text-default-600">@tazahmedcs23</p> */}
              <p className=" text-blue-600 flex gap-2 items-center mt-1">
                <Link href={'/followers'}>
                <span className="border-r-2 border-blue-500 pr-2 ">
                  {myfollowers?.data?.followers?.length
                    ? myfollowers?.data?.followers?.length
                    : "0"}{" "}
                  Followers
                </span>
                </Link>
                <Link href={'/following'}>
                <span>
                  {following?.data?.following?.length
                    ? following?.data?.following?.length
                    : "0"}{" "}
                  Following
                </span>
                </Link>
                {/* <span>- 150 Following</span> */}
              </p>
            </div>
            {/* button */}
            <div className="flex gap-2">
              {/*edit button  */}
              <div className="flex-1">
                <EditProfile />
              </div>
              {/* create past button */}
              <div className="flex-1">
                <CreatePostModal
                  buttonText="Create Post"
                  icon={<IoMdAdd />}
                  iconColor="text-black"
                  variant="ghost"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
