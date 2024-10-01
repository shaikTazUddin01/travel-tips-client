"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
  Divider,
} from "@nextui-org/react";
import DOMPurify from "dompurify";
import { AiOutlineLike } from "react-icons/ai";
import { FaCrown, FaRegComment } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import { FaComment } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { TPost } from "@/src/types";
import { MdOutlinePublic } from "react-icons/md";
import { BiSolidBadgeCheck } from "react-icons/bi";
import useUser from "@/src/hooks/user/useShowUser";
// import { getTextContent } from "@/src/lib/getTextContent";

export default function NewsFeedCard({ postItem }: { postItem: TPost }) {
  // const [isFollowed, setIsFollowed] = React.useState(false);
  const [iconHover,setIconHover]=
  const {user:currentUser}=useUser()
  const {
    category,
    image,
    like,
    comment,
    postContent,
    tags,
    share,
    user,
    isVerify,
  } = postItem || {};
  return (
    <Card className="w-full mb-6 border">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={user?.image}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-[16px] font-semibold leading-none text-default-600 flex items-center ">
              <span>{user?.name}</span>
              {isVerify && (
                <span className="text-blue-600">
                  <BiSolidBadgeCheck />
                </span>
              )}
            </h4>
            <h5 className="text-small tracking-tight text-default-400 flex items-center gap-1">
              <span>{tags}</span>
              {tags == "Premium" ? (
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
        {
          currentUser?.email !== user?.email ?
        <Button className="rounded-full" size="sm" color="primary">
          Follow
        </Button>
        :
        <Button className="rounded-full text-2xl font-medium bg-transparent hover:bg-slate-200 flex justify-center items-center p-0">
          ...
        </Button>
          }
      </CardHeader>
      <CardBody className="px-0 py-0 text-small">
        <div className="px-3 pb-3">
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postContent) }} />          
          <span className="pt-2 text-default-500">#{category}</span>
        </div>
        <Image
          alt="news"
          className="object-cover px-0 w-full rounded-none"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          //   width={270}
        />
      </CardBody>
      <CardFooter className="gap-3 flex-col">
        <div className="flex w-full justify-between">
          <h1 className="flex items-center gap-1">
            <span className="text-white bg-blue-600 rounded-full p-[3px]">
              <AiFillLike />
            </span>{" "}
            <span>{like}</span>
          </h1>
          <h1 className="flex items-center gap-1">
            <span>
              <FaComment />
            </span>{" "}
            <span>{comment}</span>
          </h1>
        </div>

        <Divider />
        <div className="flex w-full justify-between">
          <h1 className="flex items-center gap-1 hover:bg-slate-200 px-5 rounded py-2   cursor-pointer">
            <span className="text-xl">
              <AiOutlineLike />
            </span>{" "}
            <span className="">Like</span>
          </h1>
          <h1 className="flex items-center gap-1 hover:bg-slate-200 px-5 rounded py-2  cursor-pointer">
            <span className="text-xl">
              <FaRegComment />
            </span>{" "}
            <span>Comment</span>
          </h1>
          <h1 className="flex items-center gap-1 hover:bg-slate-200 px-5 rounded py-2  cursor-pointer">
            <span className="text-xl">
              <PiShareFat />
            </span>{" "}
            <span>Share</span>
          </h1>
        </div>
      </CardFooter>
    </Card>
  );
}
