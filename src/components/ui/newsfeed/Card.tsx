/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
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
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUpvoteDownvoteMutation } from "@/src/redux/features/post/postApi";

export default function NewsFeedCard({ postItem }: { postItem: TPost }) {
  const [upvoteDownvote, { isLoading: upDoLoading }] =
    useUpvoteDownvoteMutation();
  const [isUpvote, setIsUpvote] = useState<boolean>();
  // const =useState('')
  // const { user: currentUser } = useUser();
  const {
    category,
    image,
    like,
    comment,
    postContent,
    type,
    share,
    user,
    isVerify,
    _id,
  } = postItem || {};

  const handleUpvote = async (id: string) => {
    // const toastId=toast.loading("loading...")
    try {
      if (id) {
        await upvoteDownvote({ postId: id });
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const isUserUpvote = like.find((item) => item == user?._id);

  useEffect(() => {
    setIsUpvote(!!isUserUpvote);
  }, [isUserUpvote]);

  return (
    <Card className="w-full mb-6 border">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" src={user?.image} />
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
          </div>
        </div>

        <Dropdown>
          <DropdownTrigger>
            <Button
              className="text-xl font-semibold"
              variant="light"
              size="sm"
              radius="full"
            >
              <BsThreeDots />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      {/* post content */}
      <CardBody className="px-0 py-0 text-small w-[100%]">
        <div className="px-3 pb-3">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postContent),
            }}
          />
        </div>
        <span className="pl-2 text-default-500 mt-2">#{category}</span>
        {/* image */}
        <div className="w-full ">
          <Image
            alt="post image"
            className="object-cover w-[1000px] rounded-none h-[300px]"
            src={image}
          />
        </div>
      </CardBody>
      {/* all like */}
      <CardFooter className="gap-3 flex-col">
        <div className="flex w-full justify-between">
          <h1 className="flex items-center gap-1">
            <span className="text-white bg-blue-600 rounded-full p-[3px]">
              <AiFillLike />
            </span>{" "}
            <span>{like?.length}</span>
          </h1>
          <h1 className="flex items-center gap-1">
            <span>
              <FaComment />
            </span>{" "}
            <span>{comment}</span>
          </h1>
        </div>

        <Divider />
        <div className="flex w-full justify-between gap-10">
          {/* like section */}
          {
            upDoLoading ?
            <Button  className="flex-1 text-[16px]"
            size="sm"
            variant="flat" isLoading>
          </Button>
      :
          <Button
            className="flex-1 text-[16px]"
            size="sm"
            variant="flat"
            onClick={() => handleUpvote(_id)}
          >
            {isUpvote ? (
              <span className="flex gap-1 items-center text-blue-600 ">
                <span className="text-xl">
                  <AiFillLike />
                </span>
                <span className="font-medium">Like</span>
              </span>
            ) : (
              <span className="flex gap-1 items-center">
                <span className="text-xl">
                  <AiOutlineLike />
                </span>
                <span className="">Like</span>
              </span>
            )}
          </Button>
          }

          {/* comment section */}

          <Button className="flex-1 text-[16px]" size="sm" variant="flat">
            <span className="text-xl">
              <FaRegComment />
            </span>{" "}
            <span>Comment</span>
          </Button>
          <Button className="flex-1 text-[16px]" size="sm" variant="flat">
            <span className="text-xl">
              <PiShareFat />
            </span>{" "}
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
