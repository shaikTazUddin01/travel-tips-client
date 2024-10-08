/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-sort-props */
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { MdEdit } from "react-icons/md";

import TDForm from "../../form/TDForm";
import TDSelect from "../../form/TDSelect";
import TDInput from "../../form/TDInput";

import { TResponse } from "@/src/types";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/src/redux/features/user/userApi";
import useUser from "@/src/hooks/user/useShowUser";
import { genderOptions } from "@/src/app/(auth)/signup/page";

export default function EditProfile() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updateUser, { isSuccess }] = useUpdateUserMutation();
  const { user } = useUser();
  const { data: userData } = useGetSingleUserQuery(user?.userId as string);
  // console.log("--->",userData);
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("updating....");
    try {
      const payload = {
        id: user?.userId,
        updateInFo: data,
      };
      //  console.log(payload);
      const res = (await updateUser({ payload })) as TResponse<any>;

      if (res?.data) {
        toast.success("updated success", { id: toastId, duration: 1000 });
        onOpenChange();
      } else {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  return (
    <>
      <Button
        className="flex justify-center items-center gap-1"
        color="primary"
        size="md"
        onPress={onOpen}
      >
        <span>
          <MdEdit />
        </span>
        <span>Edit Profile</span>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="mt-8">
                <h1 className="text-center font-medium text-xl">
                  Edit Your Profile
                </h1>
                <TDForm onSubmit={handleSubmit}>
                  <div className="space-y-3">
                    <TDInput
                      name="name"
                      label="Name"
                      defaultvalue={userData?.data?.name}
                    />
                    <TDInput
                      name="phoneNumber"
                      label="Phone Number"
                      defaultvalue={userData?.data?.phoneNumber}
                    />
                    <div className="flex gap-2">
                      <TDSelect
                        label="Gender"
                        name="gender"
                        options={genderOptions}
                        required={true}
                        defaultValue={userData?.data?.gender}
                      />
                      <TDInput
                        label="age"
                        name="age"
                        required={true}
                        type="number"
                        defaultvalue={userData?.data?.age}
                      />
                    </div>

                    <TDInput
                      name="phoneNumber"
                      label="Phone Number"
                      defaultvalue={userData?.data?.address}
                    />
                    <Button className="w-full" color="primary" type="submit">
                      update now
                    </Button>
                  </div>
                </TDForm>
              </ModalBody>
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
