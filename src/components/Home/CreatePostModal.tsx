"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import { ReactNode, useState } from "react";
import QuillEditor from "./QuillEditor";
import useDebounce from "@/src/hooks/useDebounce";
import { delay } from "framer-motion";
import TDForm from "../form/TDForm";
import TDInput from "../form/TDInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreatePostMutation } from "@/src/redux/features/post/postApi";
import { TResponse } from "@/src/types";
import { toast } from "sonner";

interface IProps {
  buttonText: string;
  variant?:"light" | "flat" | "solid" | "bordered" | "faded" | "shadow" | "ghost" | undefined;
  icon?: ReactNode;
  iconColor?: string;
  btnClass?: string;
  size?: "sm" | "md" | "lg" | undefined;
  btnColor?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
}

export default function CreatePostModal({
  buttonText,
  icon,
  iconColor,
  btnClass,
  size,
  btnColor = "default",
  variant="light"
}: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const { isOpen, onOpen, onOpenChange, setIsOpen } = useDisclosure();

  const [discription, setDiscription] = useState<string>("");
  //  create post hooks
  const [createPost] = useCreatePostMutation();
  //  console.log(useDebounce(discription));
  const description = useDebounce(discription);

  const onSubmit: SubmitHandler<FieldValues> = async (data,event) => {
    try {
      if (description) {
        const postDetails = {
          image: data?.image,
          postContent: description,
          category: "Technology",
          tags: "Premium",
        };

        const res = (await createPost(postDetails)) as TResponse<any>;
        // console.log(res?.data?.data?.accessToken);
        if (res?.data) {
          toast.success("post create success");

          // console.log(res.data);
          // onOpenChange(false);

          // console.log(decoded);
        } else {
          toast.error(res?.error?.data?.message);
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <Button
        color={btnColor}
        variant={variant}
        onPress={onOpen}
        className={`${btnClass ? btnClass : "w-full"}`}
        size={`${size ? size : "md"}`}
      >
        {icon && iconColor && (
          <span className={`${iconColor} text-xl`}>{icon}</span>
        )}
        <span>{buttonText}</span>
      </Button>
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
                    src="https://nextui.org/avatars/avatar-1.png"
                  />
                  <div>
                    <h1>Taz Uddin</h1>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <QuillEditor setDiscription={setDiscription} />
                <TDForm onSubmit={onSubmit}>
                  <TDInput label="Image" name="image" required={true} />

                  <Button type="submit">post</Button>
                </TDForm>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
