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
} from "@nextui-org/react";
import DOMPurify from "dompurify";
import { AiOutlineLike } from "react-icons/ai";
import { FaArrowsToEye, FaCrown, FaRegComment } from "react-icons/fa6";
import { FaComment } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { MdOutlinePublic, MdSend } from "react-icons/md";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Link from "next/link";

import CommentBox from "./CommentBox";

import { TPost, TResponse } from "@/src/types";
import {
  useCommentToPostMutation,
  useUpvoteDownvoteMutation,
} from "@/src/redux/features/post/postApi";

// import useCurrentUser from "@/src/hooks/user/useCurrentUser";
import DeleteAndEditPost from "@/src/lib/DeleteOrEditPost/DeleteAndEditPost";
import useUser from "@/src/hooks/user/useShowUser";
import { useGetSingleUserQuery } from "@/src/redux/features/user/userApi";

export default function NewsFeedCard({ postItem }: { postItem: TPost }) {
  const [isClickToComment, setIsClickToComment] = useState(false);
  // const { _id: currentUserId } = useCurrentUser();
  const { user: userInFo } = useUser();
  const currentUserId = userInFo?.userId;
  // get single user
  const { data: userdata } = useGetSingleUserQuery(currentUserId as string);

  const myData = userdata?.data;

  const [upvoteDownvote, { isLoading: upDoLoading }] =
    useUpvoteDownvoteMutation();
  // comment to post
  const [postComment] = useCommentToPostMutation();
  const [isUpvote, setIsUpvote] = useState<boolean>();
  // show comment under ther post
  const [showComment, setShowComment] = useState(false);
  // const currentUser=useCurrentUser()
  const {
    category,
    image,
    like,
    comment,
    postContent,
    type,
    share,
    user,
    // isVerify,
    _id,
  } = postItem || {};

  // console.log(currentUserId);

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

  const isUserUpvote = like.find((item) => item == myData?._id);

  // console.log("--->",isUserUpvote);

  useEffect(() => {
    setIsUpvote(!!isUserUpvote);
  }, [isUserUpvote]);

  // handle comment submit
  const handleCommentSubmit: SubmitHandler<FieldValues> = async (e) => {
    e.preventDefault();
    const commentfield = e.target.comment.value;

    const commentInFo = {
      postId: _id,
      comment: commentfield,
    };
    const res = (await postComment(commentInFo)) as TResponse<any>;
    if (res?.data) {
      toast.success("your comment post succefully..", { duration: 1000 });
      e.target.comment.value = "";
    }
    // console.log(res);
  };

  return (
    <Card className={`w-full mb-6 border`}>
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Link href={`/${user?._id}`}>
            <Avatar isBordered radius="full" size="md" src={user?.image} />
          </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
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
        {currentUserId == user?._id && (
          <DeleteAndEditPost postItem={postItem} />
        )}
      </CardHeader>
      {/* post content */}
      <CardBody
        className={`px-0 py-0 text-small w-[100%] ${myData?.isVerify == false && type == "Premium" && "blur-2xl"}`}
      >
        <Link href={`/post/${_id}`}>
          <div className="px-3 pb-3 flex gap-1">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  `${postContent?.slice(0, 120)}<span style="color:blue"}> more....</span>`
                ),
              }}
            />
          </div>
        </Link>
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
      <CardFooter
        className={`gap-3 flex-col  ${myData?.isVerify == false && type == "Premium" && "blur-2xl"}`}
      >
        <div className="flex w-full justify-between">
          <h1 className="flex items-center gap-1">
            <span className="text-white bg-blue-600 rounded-full p-[3px]">
              <AiFillLike />
            </span>{" "}
            <span>{like?.length}</span>
          </h1>

          <button
            className="flex items-center gap-1"
            onClick={() => setShowComment(!showComment)}
          >
            <span>
              <FaComment />
            </span>{" "}
            <span>{comment?.length}</span>
          </button>
        </div>

        <Divider />
        <div className="flex w-full justify-between gap-10">
          {/* like section */}
          {upDoLoading ? (
            <Button
              isLoading
              className="flex-1 text-[16px]"
              size="sm"
              variant="flat"
            />
          ) : (
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
                  <span className="hidden md:flex">Like</span>
                </span>
              ) : (
                <span className="flex gap-1 items-center">
                  <span className="text-xl">
                    <AiOutlineLike />
                  </span>
                  <span className="hidden md:flex">Like</span>
                </span>
              )}
            </Button>
          )}

          {/* comment section */}
          <Button
            className="flex-1 text-[16px]"
            size="sm"
            variant="flat"
            onClick={() => setIsClickToComment(!isClickToComment)}
          >
            <span className="text-xl">
              <FaRegComment />
            </span>{" "}
            <span className="hidden md:flex">Comment</span>
          </Button>
          {/* view post */}
          <Link href={`/post/${_id}`}>
            <Button
              className="flex-1 text-[16px] cursor-pointer"
              size="sm"
              variant="flat"
              onClick={() => setIsClickToComment(!isClickToComment)}
            >
              <span className="text-xl">
                <FaArrowsToEye />
              </span>{" "}
              <span className="hidden md:flex">see post</span>
            </Button>
          </Link>
        </div>
      </CardFooter>
      {/* showing comment */}
      {showComment ? <CommentBox comment={comment} postId={_id} /> : ""}
      {/* handle send comment */}
      {isClickToComment && (
        <div className="p-5 flex gap-2 items-start ">
          <div className="mt-2">
            <Avatar isBordered radius="full" size="md" src={userInFo?.image} />
          </div>

          <div className="flex-1">
            <form
              action=""
              className="relative flex items-end border-2 shadow-md rounded-xl p-2"
              onSubmit={handleCommentSubmit}
            >
              <textarea
                className="w-full p-2  resize-none border-none focus:ring-0 focus:outline-none"
                id="comment"
                name="comment"
                placeholder="Write a comment..."
                rows={3}
              />
              <button
                className="ml-2 text-sky-800 p-2 justify-end text-xl"
                type="submit"
              >
                <MdSend />
              </button>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
}
