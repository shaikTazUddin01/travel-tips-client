/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

// import useCurrentUser from "@/src/hooks/user/useCurrentUser";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {
  Avatar,
  Button,
  Divider,
  Image,
} from "@nextui-org/react";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { FaComment, FaCrown, FaRegComment } from "react-icons/fa";
import { MdOutlinePublic, MdSend } from "react-icons/md";
import { toast } from "sonner";

import { TResponse } from "@/src/types";
import {
  useCommentToPostMutation,
  useGetSinglePostQuery,
  useUpvoteDownvoteMutation,
} from "@/src/redux/features/post/postApi";
import CommentBox from "@/src/components/ui/newsfeed/CommentBox";
import LoadingSkeletor from "@/src/components/ui/LoadingSkeleton/LoadingSkeleton";
import DeleteAndEditPost from "@/src/lib/DeleteOrEditPost/DeleteAndEditPost";
import useUser from "@/src/hooks/user/useShowUser";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {useRef} from 'react'
import { PiDownloadSimpleBold } from "react-icons/pi";
export default function ViewPost() {
  const { id } = useParams();
  const { data: specificPost, isLoading } = useGetSinglePostQuery(id as string);
  const pdfRef :any=useRef()

  const [isClickToComment, setIsClickToComment] = useState(false);
  const [upvoteDownvote, { isLoading: upDoLoading }] =
    useUpvoteDownvoteMutation();
  // comment to post
  const [postComment] = useCommentToPostMutation();
  const [isUpvote, setIsUpvote] = useState<boolean>();
  // show comment under ther post
  const [showComment, setShowComment] = useState(false);
  // user 
  const {user : userInFo}=useUser()
  const currentUserId=userInFo?.userId
  const {
    category,
    image,
    like,
    comment,
    postContent,
    type,
    share,
    user,
    _id,
  } = specificPost?.data || {};

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

  const isUserUpvote = like?.find((item: any) => item == user?._id);

  useEffect(() => {
    setIsUpvote(!!isUserUpvote);
  }, [isUserUpvote]);

// download pfd
const downloadPDF = () => {
  const input = pdfRef.current;  
  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();


    const imgWidth = canvas.width;
    const imgHeight = canvas.height;


    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const finalImgWidth = imgWidth * ratio;
    const finalImgHeight = imgHeight * ratio;

    
    pdf.addImage(imgData, "PNG", 0, 0, finalImgWidth, finalImgHeight);
    
    pdf.save("post-content.pdf"); 
  });
};
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
    }
    // console.log(res);
  };

  if (isLoading) {
    return (
      <div className="-mt-5">
        <LoadingSkeletor />
      </div>
    );
  }

  // const
  return (
    <Card ref={pdfRef} className="w-full mb-6 border">
      <CardHeader className="justify-between"> 
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" src={user?.image} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-[16px] font-semibold leading-none text-default-600 flex items-center ">
              <span>{user?.name}</span>
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

{/* 
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="text-xl font-semibold"
              radius="full"
              size="sm"
              variant="light"
            >
              <BsThreeDots />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
 */}
{currentUserId == user?._id && (
          <DeleteAndEditPost postItem={specificPost?.data }/>
        )}

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

          <button
            className="flex items-center gap-1"
            // onClick={() => setShowComment(!showComment)}
          >
            <span>
              <FaComment />
            </span>{" "}
            <span>{comment?.length}</span>
          </button>
        </div>

        <Divider />
        <div className="flex w-full justify-between gap-4 md:gap-10">
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
                  <span className="font-medium hidden md:flex">Like</span>
                </span>
              ) : (
                <span className="flex gap-1 items-center">
                  <span className="text-xl">
                    <AiOutlineLike />
                  </span>
                  <span className=" hidden md:flex">Like</span>
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
          {/* pdf */}
          <Button
            className="flex-1 text-[16px]"
            size="sm"
            variant="flat"
            onClick={downloadPDF}
          >
            <span className="text-xl">
              <PiDownloadSimpleBold />
            </span>{" "}
            <span className="hidden md:flex">pdf file</span>
          </Button>


        </div>
      </CardFooter>
      {/* showing comment */}
      {/* showing comment */}
      <CommentBox comment={comment} postId={_id} />
      {/* handle comment */}
      <div className="px-5">
        <Divider />
      </div>
      <div className="p-5 flex gap-2 items-start ">
        <div className="mt-2">
          <Avatar isBordered radius="full" size="md" src={user?.image} />
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
    </Card>
  );
}
