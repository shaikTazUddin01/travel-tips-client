/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useParams } from "next/navigation";
import { Button, Image } from "@nextui-org/react";

import bg from "@/src/assets/login1.webp";
import NewsFeedCard from "@/src/components/ui/newsfeed/Card";
import {
  useGetMyInFoQuery,
  useGetSingleUserQuery,
} from "@/src/redux/features/user/userApi";
import { TPost, TUser } from "@/src/types";
import { useGetSpecificPostQuery } from "@/src/redux/features/post/postApi";
import LeftSide from "@/src/components/ui/profile/LeftSide";
import LoadingSkeletor from "@/src/components/ui/LoadingSkeleton/LoadingSkeleton";
// import { FaUserPlus } from "react-icons/fa";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import SendRequest from "@/src/components/ui/FriendProcess/SendRequest";
import Follow from "@/src/components/ui/followingProcess/Follow";

import { useEffect, useState } from "react";
import { useGetMyFollowingQuery } from "@/src/redux/features/following/followingApi";
import UnFollow from "@/src/components/ui/followingProcess/UnFollow";
import { FaUserTimes } from "react-icons/fa";
import UnFriend from "@/src/components/ui/FriendProcess/UnFriend";
import { useGetSpecificFollowersQuery } from "@/src/redux/features/followers/followersAPi";

const page = () => {
  const { id } = useParams();
  // const my account info
  const { data: myInfo } = useGetMyInFoQuery(undefined);
  const [following, setAlreadyFollowing] = useState(false);
  const [alreadyFriend, setAlreadyFriend] = useState(false);
  // get this profile user info
  const { data: userData, isLoading: userLoading } = useGetSingleUserQuery(
    id as string
  );
  // get followers post
  const { data: post, isLoading: postLoading } = useGetSpecificPostQuery(id);
  // get my following Info
  const { data, isLoading: followingLoading } =
    useGetMyFollowingQuery(undefined);

  // get followers InFo
  const {data:followers}=useGetSpecificFollowersQuery(id)

  useEffect(() => {
    const isAlreadyFollowing = data?.data?.following?.find(
      (item: TUser) => item?._id == id
    );

    if (isAlreadyFollowing) {
      setAlreadyFollowing(true);
    } else {
      setAlreadyFollowing(false);
    }
  }, [data?.data?.following]);

  // user info
  const userInFo: TUser = userData?.data;
  // all post
  const posts = post?.data;
  // console.log(posts);

  //my information
  console.log(followers);

  useEffect(() => {
    const isAlreadyFriend = myInfo?.data?.myFriendList?.find(
      (item: TUser) => item?._id == id
    );

    if (isAlreadyFriend) {
      setAlreadyFriend(true);
    } else {
      setAlreadyFriend(false);
    }
  }, [myInfo?.data?.myFriendList]);

  return (
    <div>
      {/* main section */}
      <div className="relative">
        <div
          className="h-[250px] w-100% bg-stone-200 rounded-xl object-cover bg-cover"
          style={{ backgroundImage: `url(${bg.src})` }}
        />
        <div className="-mt-6 mx-5">
          {/* header */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* user info */}
            <div className="flex flex-col md:flex-row gap-1 items-center">
              <Image
                className="size-[140px] border-3 border-white"
                radius="full"
                src={userInFo?.image}
                alt={userInFo?.name}
              />
              <div className="flex flex-col md:flex-row justify-between  items-start flex-1">
                <div>
                  <h1 className="font-medium text-xl">{userInFo?.name}</h1>
                  {/* <p className="text-sm text-default-600">@tazahmedcs23</p> */}
                  <p className="flex gap-4 text-blue-600 justify-center md:justify-start">
                    {/* followers */}
                    <span className=" ">
                  {followers?.data?.followers?.length
                    ? followers?.data?.followers?.length
                    : "0"}{" "}
                  Followers
                </span>
                    {/* <span>- 150 Following</span> */}
                  </p>
                </div>
                {/* button */}
              </div>
            </div>
            {/* send request */}
            <div className="flex gap-1">
              {alreadyFriend ? <UnFriend userId={userInFo?._id} radius="md" icon={<FaUserTimes />}/> : <SendRequest userId={userInFo?._id} />}
              {following ? (
                <UnFollow
                  userId={userInFo?._id}
                  radius="md"
                  color="default"
                  varient="ghost"
                  size="md"
                  icon={<RiUserUnfollowFill />}
                />
              ) : (
                <Follow
                  userId={userInFo?._id}
                  radius="md"
                  color="default"
                  varient="ghost"
                  size="md"
                  icon={<RiUserFollowFill />}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-5">
        {/* LeftSide user details */}
        <div className="w-[100%] lg:w-[35%]  h-auto lg:sticky lg:top-20 ">
          <LeftSide
            myPost={posts}
            user={userInFo}
            iscardLoading={userLoading}
            isImageLoading={postLoading}
          />
        </div>

        {/* content section */}
        <div className=" mt-5 md:mt-0 md:mx-5 w-[100%] lg:w-[65%]">
          {postLoading ? (
            <LoadingSkeletor />
          ) : posts?.length > 0 ? (
            posts?.map((postItem: TPost) => (
              <NewsFeedCard key={postItem?._id} postItem={postItem} />
            ))
          ) : (
            <h1 className="text-center">No Post added .!</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
