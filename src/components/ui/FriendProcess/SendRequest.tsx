import useUser from "@/src/hooks/user/useShowUser";
import {
  useGetMyInFoQuery,
  useSendFriendRequestMutation,
} from "@/src/redux/features/user/userApi";
import { TResponse } from "@/src/types";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { RiUserShared2Fill } from "react-icons/ri";
import { toast } from "sonner";

const SendRequest = ({ userId }: { userId: string }) => {
  const [sendFriendRequest, { isLoading }] = useSendFriendRequestMutation();
  const { user } = useUser();
  //   is already request send
  const [alreadySend, setAlreadySend] = useState(false);
  const { data: myInfo } = useGetMyInFoQuery(user?._id);
  const handleSendFriendRequest = async () => {
    const toastId = toast.loading("sending...");
    try {
      // console.log(userId);
      const res = (await sendFriendRequest(userId)) as TResponse<any>;
      if (res?.data) {
        toast.success("request sent", { id: toastId, duration: 1000 });
      } else {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };
  // console.log(myInfo?.data?.sendFriendRequest);
  useEffect(() => {
    if (myInfo?.data?.sendFriendRequest?.includes(userId)) {
      setAlreadySend(true);
    }
  }, [myInfo?.data?.sendFriendRequest]);

  return (
    <div>
      {alreadySend ? (
        <Button
          color="primary"
          className="flex items-center gap-1"
          onClick={() => {
            handleSendFriendRequest();
          }}
        >
          {" "}
          <span className="text-xl">
            <RiUserShared2Fill />{" "}
          </span>{" "}
          <span>Cancel request</span>
        </Button>
      ) : (
        <Button
          color="primary"
          className="flex items-center gap-1"
          onClick={() => {
            handleSendFriendRequest();
          }}
        >
          {" "}
          <span className="text-xl">
            <FaUserPlus />{" "}
          </span>{" "}
          <span>Add friend</span>
        </Button>
      )}
    </div>
  );
};

export default SendRequest;
