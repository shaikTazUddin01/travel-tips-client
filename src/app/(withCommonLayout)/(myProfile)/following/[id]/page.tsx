/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useParams } from "next/navigation";
import { Image } from "@nextui-org/react";

import bg from "@/src/assets/login1.webp";
import NewsFeedCard from "@/src/components/ui/newsfeed/Card";
import { useGetSingleUserQuery } from "@/src/redux/features/user/userApi";
import { TPost, TUser } from "@/src/types";
import { useGetSpecificPostQuery } from "@/src/redux/features/post/postApi";
import LeftSide from "@/src/components/ui/profile/LeftSide";
import LoadingSkeletor from "@/src/components/ui/LoadingSkeleton/LoadingSkeleton";

const page = () => {
  const { id } = useParams();
  // get followers info
  const { data: userData, isLoading:userLoading } = useGetSingleUserQuery(id as string);
// get followers post
const {data:post,isLoading:postLoading}=useGetSpecificPostQuery(id)
// user info
  const userInFo: TUser = userData?.data;
  // all post
  const posts=post?.data
  // console.log(posts);
  return (
    <div>
      {/* main section */}
      <div className="relative">
        <div
          className="h-[250px] w-100% bg-stone-200 rounded-xl object-cover bg-cover"
          style={{ backgroundImage: `url(${bg.src})` }}
         />
        <div className="-mt-6 mx-5">
          <div className="flex gap-1 items-center">
            <Image
              className="size-[140px] border-3 border-white"
              radius="full"
              src={userInFo?.image}
              alt={userInFo?.name}
            />
            <div className="flex justify-between items-start flex-1">
              <div>
                <h1 className="font-medium text-xl">{userInFo?.name}</h1>
                {/* <p className="text-sm text-default-600">@tazahmedcs23</p> */}
                <p className="flex gap-4 text-blue-600 items-center">
                  <span>120 Followers</span>
                  {/* <span>- 150 Following</span> */}
                </p>
              </div>
              {/* button */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-5">
        {/* LeftSide */}
        <div className="w-[100%] lg:w-[35%]  h-auto lg:sticky lg:top-20 ">
          <LeftSide myPost={posts} user={userInFo} iscardLoading={userLoading} isImageLoading={postLoading}/>
        </div>

        {/* content section */}
        <div className=" mx-5 w-[100%] lg:w-[65%]">
          {
          
          postLoading ?<LoadingSkeletor/>
          :
          posts?.length > 0 ?
            posts?.map((postItem: TPost) => (
              <NewsFeedCard key={postItem?._id} postItem={postItem} />
            ))
          :
          <h1 className="text-center">No Post added .!</h1>
          }
        </div>
      </div>
    </div>
  );
};

export default page;
