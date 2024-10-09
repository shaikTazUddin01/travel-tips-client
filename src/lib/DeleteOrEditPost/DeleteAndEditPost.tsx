"use client";
import {
  useDeletePostMutation,
  useUpdateSpecificPostMutation,
} from "@/src/redux/features/post/postApi";
import { TPost, TResponse } from "@/src/types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import TDSelect from "@/src/components/form/TDSelect";
import { categoryOptions } from "@/src/constant/categoryOptions";
import TDForm from "@/src/components/form/TDForm";
import QuillEditor from "@/src/components/Home/QuillEditor";
import { FieldValues, SubmitHandler } from "react-hook-form";
import TDTextArea from "@/src/components/form/TDTextArea";

const DeleteAndEditPost = ({ postItem }: { postItem: TPost }) => {
  //   console.log(postId);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdateSpecificPostMutation();
  const [discription, setDiscription] = useState<string>("");

  const handleDeletePost = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You went to delete this post",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const toastId = toast.loading("deleting....");

          // delete mutation
          const res = (await deletePost(postItem?._id)) as TResponse<any>;
          if (res?.data) {
            toast.warning("Delete Success", { id: toastId, duration: 1000 });
          } else {
            toast.error(res?.error?.data?.message, { id: toastId });
          }
        }
      });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  // update post
  const handleUpdatePost: SubmitHandler<FieldValues> = async (data) => {
    try {
      const toastId = toast.loading("updating....");
      if (discription) {
        const updateInFo = {
          postContent: discription,
          type: data?.type,
          category: data?.category,
        };
        const id = postItem?._id;
        const res = (await updatePost({ id, updateInFo })) as TResponse<any>;
        if (res?.data) {
          toast.warning("update Success", { id: toastId, duration: 1000 });
          onOpenChange();
        } else {
          toast.error(res?.error?.data?.message, { id: toastId });
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <div>
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
          <DropdownItem key="deletePost" onClick={() => handleDeletePost()}>
            Delete Post
          </DropdownItem>
          <DropdownItem key="editPost" onPress={onOpen}>
            Edit Post
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* modal */}
      {/* update text modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <QuillEditor setDiscription={setDiscription} />
                <TDForm onSubmit={handleUpdatePost}>
                  <div className="space-y-2">
                    <TDSelect
                      label="Category"
                      name="category"
                      options={categoryOptions}
                      defaultValue={postItem?.category}
                    />
                    <TDSelect
                      label="Content Type"
                      name="type"
                      options={[
                        { key: "Premium", label: "Premiun" },
                        { key: "Non-Premium", label: "Non-Premiun" },
                      ]}
                      defaultValue={postItem?.type}
                    />
                    <Button className="w-full" color="primary" type="submit">
                      update
                    </Button>
                  </div>
                </TDForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteAndEditPost;
