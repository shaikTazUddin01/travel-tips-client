import useUser from "@/src/hooks/user/useShowUser";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/src/redux/features/post/postApi";
import { IComment, TResponse } from "@/src/types";
import {
  Avatar,
  Button,
  button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "sonner";
import TDForm from "../../form/TDForm";
import TDInput from "../../form/TDInput";
import { FieldValues, SubmitHandler } from "react-hook-form";

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

  const handleCommentUpdate: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("updating....");
    try {
      const commentInfo = {
        postId: postId,
        commentId: editCommentId,
        comment: data?.comment,
      };
      const res = (await updateComment(commentInfo)) as TResponse<any>;
      // console.log(res);
      if (res?.data?.data?.modifiedCount>0) {
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
          <div className=" pb-4 px-2 w-[100%]" key={item?._id}>
            <div className="flex gap-2 w-[100%] items-start justify-start">
              <Avatar
                className=""
                isBordered
                radius="full"
                size="md"
                src={item?.userId?.image}
              />

              {editCommentId !== item?._id ? (
                // content and dropdown
                <div className="flex gap-1 items-start justify-between w-[95%] bg-default-200 rounded-xl p-2">
                  {/* content */}
                  <div>
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {item?.userId?.name}
                    </h4>
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
                // edit comment section
                <div className="w-[95%] rounded-xl p-2 bg-default-200">
                  <TDForm onSubmit={handleCommentUpdate}>
                    <TDInput label="comment" name="comment" defaultvalue={item?.comment}/>

                    <div className="flex justify-end">
                      <Button type="submit">submit</Button>
                    </div>
                  </TDForm>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentBox;
