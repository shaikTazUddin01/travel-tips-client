import {
  Avatar,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
} from "@nextui-org/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "sonner";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { MdSend } from "react-icons/md";

import { IComment, TResponse } from "@/src/types";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/src/redux/features/post/postApi";
import useUser from "@/src/hooks/user/useShowUser";

const CommentBox = ({
  comment,
  postId,
}: {
  comment: [IComment] | [];
  postId: string;
}) => {
  // delete comment mutation
  const [deleteComment] = useDeleteCommentMutation();
  // update comment mutation
  const [updateComment] = useUpdateCommentMutation();
  // get current user
  const { user } = useUser();
  // current comment id
  const [editCommentId, setEditCommentId] = useState<string | null>(null);

  // handle delete comment
  const handleDeleteComment = async (id: string) => {
    const toastId = toast.loading("deleting....");
    try {
      const commentInfo = {
        commentId: id,
        postId: postId,
      };
      const res = (await deleteComment(commentInfo)) as TResponse<any>;
      if (res?.data) {
        toast.success("comment Deleting", { id: toastId, duration: 1000 });
      } else {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };
  // handle comment update

  const handleCommentUpdate: SubmitHandler<FieldValues> = async (e) => {
    e.preventDefault();
    const updateCommentdata = e.target.comment.value;
    // console.log(updateCommentdata);
    const toastId = toast.loading("updating....");
    try {
      const commentInfo = {
        postId: postId,
        commentId: editCommentId,
        comment: updateCommentdata,
      };
      const res = (await updateComment(commentInfo)) as TResponse<any>;
      // console.log(res);
      if (res?.data?.data?.modifiedCount > 0) {
        toast.success("comment updated", { id: toastId, duration: 1000 });
        setEditCommentId(null);
      } else {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  return (
    <div className="px-3">
      <Divider className="mb-3" />
      {comment?.map((item: any) => {
        return (
          <div key={item?._id} className=" pb-4 px-2 w-[100%]">
            <div className="flex gap-2 w-[100%] items-center justify-start">
              <Link href={`/${item?.userId?._id}`}>
                <Avatar
                  isBordered
                  className=""
                  radius="full"
                  size="md"
                  src={item?.userId?.image}
                />
              </Link>
              {editCommentId !== item?._id ? (
                // content and dropdown
                <div className="flex gap-5 items-start justify-between  bg-default-200 rounded-xl p-2">
                  {/* content */}
                  <div>
                    <Link href={`/${item?.userId?._id}`}>
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {item?.userId?.name}
                      </h4>
                    </Link>
                    <h5 className="text-small ">{item?.comment}</h5>
                  </div>
                  {/* edit delete action */}
                  {/* dropdown */}
                  {user?.userId == item?.userId?._id && (
                    <div>
                      <Dropdown>
                        <DropdownTrigger>
                          <button className="p-2 rounded-full hover:bg-white">
                            <BsThreeDots />
                          </button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem
                            key="delete"
                            onClick={() => handleDeleteComment(item?._id)}
                          >
                            Delete
                          </DropdownItem>
                          <DropdownItem
                            key="edit"
                            onClick={() => setEditCommentId(item?._id)}
                          >
                            Edit
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  )}
                </div>
              ) : (
                <form
                  action=""
                  className="relative flex items-end border shadow-md rounded-xl p-2"
                  onSubmit={handleCommentUpdate}
                >
                  <textarea
                    className="w-full p-2  resize-none border-none focus:ring-0 focus:outline-none"
                    defaultValue={item?.comment}
                    id="comment"
                    name="comment"
                    rows={1}
                  />
                  <button
                    className="ml-2 text-sky-800 p-2 justify-end text-xl"
                    type="submit"
                  >
                    <MdSend />
                  </button>
                </form>

                // </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentBox;
