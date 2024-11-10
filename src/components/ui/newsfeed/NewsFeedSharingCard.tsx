/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import { Card, CardHeader, CardBody, Avatar, Image } from "@nextui-org/react";
import DOMPurify from "dompurify";
import { FaCrown } from "react-icons/fa6";
import { MdOutlinePublic } from "react-icons/md";
import { BiSolidBadgeCheck } from "react-icons/bi";
import Link from "next/link";

import { TPost } from "@/src/types";
import { useGetMyInFoQuery } from "@/src/redux/features/user/userApi";

export default function NewsFeedPostSharingCard({
  postItem,
}: {
  postItem: TPost;
}) {
  // const { _id: currentUserId } = useCurrentUser();

  const { data: userData } = useGetMyInFoQuery(undefined);

  const myData = userData?.data;

  // const currentUser=useCurrentUser()
  const {
    category,
    image,
    authId,
    postId,
    postContent,
    type,
    user,
    isThisPostShare,
  } = postItem || {};

  console.log(authId, isThisPostShare);

  return (
    <Card className={`w-full mb-6 border`}>
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          {isThisPostShare && authId ? (
            <Link href={`/${user?._id}`}>
              <Avatar isBordered radius="full" size="md" src={authId?.image} />
            </Link>
          ) : (
            <Link href={`/${user?._id}`}>
              <Avatar isBordered radius="full" size="md" src={user?.image} />
            </Link>
          )}
          <div className="flex flex-col gap-1 items-start justify-center">
            {isThisPostShare && authId ? (
              <h4 className="text-[16px] font-semibold leading-none text-default-600 flex items-center ">
                <Link href={`/${authId?._id}`}>
                  <span>{authId?.name}</span>
                </Link>
                {authId?.isVerify && (
                  <span className="text-blue-600">
                    <BiSolidBadgeCheck />
                  </span>
                )}
              </h4>
            ) : (
              <h4 className="text-[16px] font-semibold leading-none text-default-600 flex items-center ">
                <Link href={`/${user?._id}`}>
                  <span>{user?.name}</span>
                </Link>
                {user?.isVerify && (
                  <span className="text-blue-600">
                    <BiSolidBadgeCheck />
                  </span>
                )}
              </h4>
            )}

            {isThisPostShare && postId ? (
              <h5 className="text-small tracking-tight text-default-400 flex items-center gap-1">
                <span>{postId?.type}</span>
                {postId?.type == "Premium" ? (
                  <span className="text-yellow-500">
                    <FaCrown />
                  </span>
                ) : (
                  <span className="text-default-700">
                    <MdOutlinePublic />
                  </span>
                )}
              </h5>
            ) : (
              <h5 className="text-small tracking-tight text-default-400 flex items-center gap-1">
                <span>{type}</span>
                {type == "Premium" ? (
                  <span className="text-yellow-500">
                    <FaCrown />
                  </span>
                ) : (
                  <span className="text-default-700">
                    <MdOutlinePublic />
                  </span>
                )}
              </h5>
            )}
          </div>
        </div>
      </CardHeader>
      {/* post content */}
      <CardBody className={`px-0 py-0 text-small w-[100%]`}>
        <div className="px-3 pb-3 flex gap-1">
          {isThisPostShare && postId ? (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  `${postId?.postContent?.slice(0, 60)}<span style="color:blue"}> more....</span>`
                ),
              }}
            />
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  `${postContent?.slice(0, 60)}<span style="color:blue"}> more....</span>`
                ),
              }}
            />
          )}
        </div>
        {isThisPostShare && postId ? (
          <span className="pl-2 text-default-500 mt-2">
            #{postId?.category}
          </span>
        ) : (
          <span className="pl-2 text-default-500 mt-2">#{category}</span>
        )}
        {/* image */}
        <div className="w-full ">
          {isThisPostShare && postId ? (
            <Image
              alt="post image"
              className="object-cover w-[1000px] rounded-none h-[200px]"
              src={postId?.image}
            />
          ) : (
            <Image
              alt="post image"
              className="object-cover w-[1000px] rounded-none h-[200px]"
              src={image}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}
