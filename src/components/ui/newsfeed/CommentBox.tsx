import useUser from "@/src/hooks/user/useShowUser";
import { useDeleteCommentMutation } from "@/src/redux/features/post/postApi";
import { IComment, TResponse } from "@/src/types";
import {
  Avatar,
  button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "sonner";

const CommentBox = ({ comment,postId}: { comment: [IComment] | [] ,postId:string}) => {

  const [deleteComment]=useDeleteCommentMutation()
  const {user}=useUser()
// console.log(user);
  const handleDeleteComment=async(id :string)=>{
    const toastId=toast.loading("deleting....")
    try {
     const commentInfo={
      commentId:id,
      postId:postId
     }
        const res = (await deleteComment(commentInfo)) as TResponse<any>;
        if (res?.data) {
          toast.success("comment Deleting",{id:toastId,duration:1000});
        } else {
          toast.error(res?.error?.data?.message,{id:toastId});
        }
      }
     catch (error: any) {
      toast.error(error?.message,{id:toastId});
    }
     
  }


  return (
    <div className="px-3">
      <Divider className="mb-3" />
      {comment?.map((item: any) => {
        return (
          <div
            className=" pb-4 px-2 flex items-center  justify-start w-[100%]"
            key={item?._id}
          >
            <div className="flex gap-2 w-[100%] items-start justify-start">
              <Avatar
                className=""
                isBordered
                radius="full"
                size="md"
                src={item?.userId?.image}
              />
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
                {
                  user?.userId == item?.userId?._id &&
                <div>
                  <Dropdown>
                    <DropdownTrigger>
                      <button className="p-2 rounded-full hover:bg-white">
                        <BsThreeDots />
                      </button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="delete" onClick={()=>handleDeleteComment(item?._id)}>Delete</DropdownItem>
                      <DropdownItem key="edit">Edit</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentBox;
