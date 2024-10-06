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
  Image,
} from "@nextui-org/react";
import {  useState } from "react";

import QuillEditor from "./QuillEditor";
import useDebounce from "@/src/hooks/useDebounce";
import { delay } from "framer-motion";
import TDForm from "../form/TDForm";
import TDInput from "../form/TDInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreatePostMutation } from "@/src/redux/features/post/postApi";
import { IPostProps, TResponse } from "@/src/types";
import { toast } from "sonner";
import useUser from "@/src/hooks/user/useShowUser";
import TDSelect from "../form/TDSelect";
import { categoryOptions } from "@/src/utils/categoryOptions";

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
  const [createPost] = useCreatePostMutation();
  //  console.log(useDebounce(discription));
  const description = useDebounce(discription);

  // image upload
  const [imageFile, setImageFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
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

        // console.log(formData.get('data'));
        // console.log(formData.get('image'));

        const res = (await createPost(formData)) as TResponse<any>;
        if (res?.data) {
          toast.success("post create success");
        } else {
          toast.error(res?.error?.data?.message);
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
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
                    src={user?.image}
                  />
                  <div>
                    <h1>{user?.name}</h1>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <QuillEditor setDiscription={setDiscription} />
                <TDForm
                  onSubmit={onSubmit}
                  
                >
                  <div className="space-y-2">
                    <TDSelect
                      name="category"
                      label="Category"
                      options={categoryOptions}
                    />
                    <TDSelect
                      name="type"
                      label="Content Type"
                      options={[
                        { key: "Premium", label: "Premiun" },
                        { key: "Non-Premium", label: "Non-Premiun" },
                      ]}
                    />

                    {/* image upload section */}

                    <div className=" w-full  flex">
                      <label
                        htmlFor="image"
                        className="border-2 w-full border-[#e6e6e6] text-left p-3 text-[15px] text-default-500 font-normal rounded-xl"
                      >
                        {imageFile ? imageFile.name : "select image"}
                      </label>
                    </div>
                    <input
                      type="file"
                      id="image"
                      onChange={(e) => handleImageSubmit(e)}
                      className="hidden"
                    />
                    <div>
                      {imagePreview && (
                        <div className="">
                          <Image
                            src={imagePreview}
                            alt="image"
                            width={150}
                            height={150}
                            className="rounded-xl object-cover size-[150px]"
                          />
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full" color="primary">
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
