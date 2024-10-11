"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Avatar,
  Image,
} from "@nextui-org/react";
import { SetStateAction, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import TDForm from "../form/TDForm";
import TDSelect from "../form/TDSelect";

import QuillEditor from "./QuillEditor";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import useDebounce from "@/src/hooks/useDebounce";
import { useCreatePostMutation } from "@/src/redux/features/post/postApi";
import { IPostProps, TResponse } from "@/src/types";
import useUser from "@/src/hooks/user/useShowUser";
import { categoryOptions } from "@/src/constant/categoryOptions";
import dynamic from "next/dynamic";

export default function CreatePostModal({
  buttonText,
  icon,
  iconColor,
  btnClass,
  size,
  btnColor = "default",
  variant = "light",
}: IPostProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const { isOpen, onOpen, onOpenChange, setIsOpen } = useDisclosure();
  const { user } = useUser();
  
  const [discription, setDiscription] = useState<string>("");
  //  create post hooks
  const [createPost, isLoading] = useCreatePostMutation();
  //  console.log(useDebounce(discription));
  const description = useDebounce(discription);

  // image upload
  const [imageFile, setImageFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("post creating....");
    try {
      if (description) {
        const formData = new FormData();
        const postDetails = {
          postContent: description,
          category: data?.category,
          type: data?.type,
        };

        formData.append("data", JSON.stringify(postDetails));
        formData.append("image", imageFile);

        const res = (await createPost(formData)) as TResponse<any>;
        if (res?.data) {
          toast.success("post create success", { id: toastId, duration: 1000 });
          onOpenChange();
          setImageFile(null)
          setImagePreview(null)
        } else {
          toast.error(res?.error?.data?.message, { id: toastId });
        }
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  //handle image submit
  const handleImageSubmit = (e: any) => {
    const file = e.target.files[0];

    setImageFile(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Button
        className={`${btnClass ? btnClass : "w-full"}`}
        color={btnColor}
        size={`${size ? size : "md"}`}
        variant={variant}
        onPress={onOpen}
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
                    src={user?.image}
                  />
                  <div>
                    <h1>{user?.name}</h1>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
              
                <QuillEditor setDiscription={setDiscription} />
                <TDForm onSubmit={onSubmit}>
                  <div className="space-y-2">
                    <TDSelect
                      label="Category"
                      name="category"
                      options={categoryOptions}
                      required={true}
                    />
                    <TDSelect
                      label="Content Type"
                      name="type"
                      options={[
                        { key: "Premium", label: "Premiun" },
                        { key: "Non-Premium", label: "Non-Premiun" },
                      ]}
                      required={true}
                    />

                    {/* image upload section */}

                    <div className=" w-full  flex">
                      <label
                        className="border-2 w-full border-[#e6e6e6] text-left p-3 text-[15px] text-default-500 font-normal rounded-xl"
                        htmlFor="image"
                      >
                        {imageFile ? imageFile.name : "select image"}
                      </label>
                    </div>
                    <input
                      className="hidden"
                      id="image"
                      type="file"
                      onChange={(e) => handleImageSubmit(e)}
                    />
                    <div>
                      {imagePreview && (
                        <div className="">
                          <Image
                            alt="image"
                            className="rounded-xl object-cover size-[150px]"
                            height={150}
                            src={imagePreview}
                            width={150}
                          />
                        </div>
                      )}
                    </div>

                    <Button className="w-full" color="primary" type="submit">
                      post
                    </Button>
                  </div>
                </TDForm>
              </ModalBody>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
