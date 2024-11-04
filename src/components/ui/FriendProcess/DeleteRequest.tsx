import {  useDeleteRequestMutation } from "@/src/redux/features/user/userApi";
import { TResponse } from "@/src/types";
import { Button } from "@nextui-org/button";
import React from "react";
import { toast } from "sonner";

const DeleteRequest = ({ userId }: { userId: string }) => {
  // confirm request mutation
  const [confirmRequest, { isLoading: deleteRequestLoading }] =
    useDeleteRequestMutation();

  // handle confirm request
  const Delete = async (id: string) => {
    const toastId = toast.loading("deleting...");
    try {
      // console.log(userId);
      const res = (await confirmRequest(id)) as TResponse<any>;
      if (res?.data) {
        toast.warning("delete Request", { id: toastId, duration: 1000 });
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
       variant="bordered"
        size="sm"
        onClick={() => Delete(userId)}
      >
        Delete Request
      </Button>
    </div>
  );
};

export default DeleteRequest;
