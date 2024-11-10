import { useSharePostMutation } from "@/src/redux/features/post/postApi";
import { TPost, TResponse } from "@/src/types";
import { Button } from "@nextui-org/button";
import {
  Avatar,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { PiShareFat } from "react-icons/pi";
import { toast } from "sonner";
import TDForm from "../../form/TDForm";
import { useGetMyInFoQuery } from "@/src/redux/features/user/userApi";
import TDTextArea from "../../form/TDTextArea";
import NewsFeedCard from "./Card";
import NewsFeedPostSharingCard from "./NewsFeedSharingCard";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Sharing = ({ postDetails }: { postDetails: TPost }) => {
  const [sharePost] = useSharePostMutation();
  //   modal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data } = useGetMyInFoQuery(undefined);
  const user = data?.data;

//   console.log("port-->",postDetails);

  // share post
  const handleSharePost: SubmitHandler<FieldValues> = async (data) => {
let sharePostInFo;


if (postDetails?.isThisPostShare) {
    sharePostInFo = {
        user: user?._id,
        authId: postDetails?.authId?._id,
        shareDetails: data?.shareDetails,
        postId: postDetails?.postId?._id,
      };
}else{
    sharePostInFo = {
        user: user?._id,
        authId: postDetails?.user?._id,
        shareDetails: data?.shareDetails,
        postId: postDetails?._id,
      };
}

     


    const toastId = toast.loading("sharing...");
    try {
      const res = (await sharePost(sharePostInFo)) as TResponse<any>;
      // const res=undefined
      if (res?.data) {
        toast.success("you share this post", { id: toastId, duration: 1500 });
        onOpenChange();
      } else {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 1500 });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId, duration: 1500 });
    }
  };

  return (
    <div>
      <Button
        className="flex-1 text-[16px] cursor-pointer"
        size="sm"
        variant="flat"
        onPress={onOpen}
      >
        <span className="text-xl">
          <PiShareFat />
        </span>{" "}
        <span className="hidden md:flex">Share</span>
      </Button>{" "}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div className="min-h-[80vh]">
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={user?.image}
                  />
                  <div>
                    <h1>{user?.name}</h1>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <TDForm onSubmit={handleSharePost}>
                  <div className="space-y-2">
                    <TDTextArea
                      name="shareDetails"
                      variant="underlined"
                      placeholdertext="write something about this post.."
                    />

                    <NewsFeedPostSharingCard postItem={postDetails} />

                    <Button className="w-full" color="primary" type="submit">
                      Share
                    </Button>
                  </div>
                </TDForm>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Sharing;
