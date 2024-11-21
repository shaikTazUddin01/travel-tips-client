/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Image,
} from "@nextui-org/react";
import DOMPurify from "dompurify";


import { BiSolidBadgeCheck } from "react-icons/bi";

import Link from "next/link";

import { TPost } from "@/src/types";
import { FaCrown } from "react-icons/fa";
import { MdOutlinePublic } from "react-icons/md";

export default function PostById({postItem}:{postItem:TPost}) {

  // const currentUser=useCurrentUser()
  const {
    postId,
    authId
  } =postItem || {};

  // console.log(currentUserId);

  return (
    <Card className={`w-full mb-6 border`}>
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Link href={`/${authId?._id}`}>
            <Avatar isBordered radius="full" size="md" src={authId?.image} />
          </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
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
          </div>
        </div>
       
      </CardHeader>
      {/* post content */}
      <CardBody
        className={`px-0 py-0 text-small w-[100%]`}
      >
        <Link href={`/post/${postId?._id}`}>
          <div className="px-3 pb-3 flex gap-1">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  `${ postId?.postContent?.length>120 ?postId?.postContent?.slice(0, 120)+`<span style="color:blue"}> more....</span>`:postId?.postContent}`
                ),
              }}
            />
          </div>
        </Link>
        <span className="pl-2 text-default-500 mt-2">#{postId?.category}</span>
        {/* image */}
        <div className="w-full ">
          <Image
            alt="post image"
            className="object-cover w-[1000px] rounded-none h-[300px]"
            src={postId?.image}
          />
        </div>
      </CardBody>
      {/* all like */}
      {/* <CardFooter
        className={`gap-3 flex-col  `}
      >
        <div className="flex w-full justify-between">
          <h1 className="flex items-center gap-1">
            <span className="text-white bg-blue-600 rounded-full p-[3px]">
              <AiFillLike />
            </span>{" "}
            <span>{like?.length}</span>
          </h1>

         
        </div>

      
      </CardFooter> */}
     
    </Card>
  );
}
