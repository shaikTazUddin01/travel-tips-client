import { useConfirmRequestMutation } from "@/src/redux/features/user/userApi";
import { TResponse } from "@/src/types";
import { Button } from "@nextui-org/button";
import React from "react";
import { toast } from "sonner";

const AcceptRequest = ({ userId }: { userId: string }) => {
  // confirm request mutation
  const [confirmRequest, { isLoading: confirmRequestLoading }] =
    useConfirmRequestMutation();

  // handle confirm request
  const handleConfirm = async (id: string) => {
    const toastId = toast.loading("confirm...");
    try {
      // console.log(userId);
      const res = (await confirmRequest(id)) as TResponse<any>;
      if (res?.data) {
        toast.success("Accept Request", { id: toastId, duration: 1000 });
      } else {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  return (
    <div>
      <Button
        className="w-full text-sm"
        color="primary"
        size="sm"
        onClick={() => handleConfirm(userId)}
      >
        Confirm Request
      </Button>
    </div>
  );
};

export default AcceptRequest;
