"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@nextui-org/react";
import { IoIosCamera, IoMdAdd, IoMdCamera } from "react-icons/io";

import bg from "@/src/assets/login1.jpg";
import CreatePostModal from "@/src/components/Home/CreatePostModal";
import NewsFeedCard from "@/src/components/ui/newsfeed/Card";
import CreatePost from "@/src/components/Home/CreatePost";
import useUser from "@/src/hooks/user/useShowUser";
import { useGetMyPostQuery } from "@/src/redux/features/post/postApi";
import LoadingSkeletor from "@/src/components/ui/LoadingSkeleton/LoadingSkeleton";
import { TPost } from "@/src/types";
import EditProfile from "@/src/components/ui/profile/EditProfile";
import { MdCamera, MdEdit } from "react-icons/md";
import EditImage from "@/src/components/ui/profile/EditImage";
import { useGetSingleUserQuery } from "@/src/redux/features/user/userApi";

const Profile = () => {
  const { user } = useUser();
  const {data:userData}=useGetSingleUserQuery(user?.userId as string)
  const { data: mypost, isLoading } = useGetMyPostQuery(undefined);
  return (
    <div>
      {/* main section */}
      <div className="relative ">
        <div
          className="h-[250px] w-100% bg-stone-200 rounded-xl object-cover bg-cover"
          style={{ backgroundImage: `url(${bg.src})` }}
        />


        <div className="-mt-4 lg:mx-5">
          <div className="flex flex-col lg:flex-row gap-1 items-center">


            <EditImage user={userData?.data}/>

            <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start flex-1 w-full">
              <div className="text-center lg:text-left">
                <h1 className="font-medium text-xl">{userData?.data?.name}</h1>
                <p className="text-sm text-default-600">@tazahmedcs23</p>
                <p className=" text-blue-600 ">
                  <span>120 Followers</span>
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
      {/* content section */}
      <div className="mt-5 lg:mx-5">
        <CreatePost />

        {isLoading ? (
          Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index}>
                <LoadingSkeletor />
              </div>
            ))
        ) : (
          <div className="mt-5">
            {mypost?.data?.map((data: TPost) => {
              return (
                <div key={data?._id}>
                  <NewsFeedCard postItem={data} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
