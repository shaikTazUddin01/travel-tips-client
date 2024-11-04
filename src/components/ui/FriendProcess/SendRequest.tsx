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
  const { data: myInfo, isLoading: myDataLoading } = useGetMyInFoQuery(
    user?._id
  );
  // 
  const handleFriendRequest = async () => {
    const toastId = toast.loading("sending...");
    try {
      // console.log(userId);
      const res = (await sendFriendRequest(userId)) as TResponse<any>;
      if (res?.data) {
        if (alreadySend) {
          toast.success("request cancel", { id: toastId, duration: 1000 });
        }else{
          toast.success("request send", { id: toastId, duration: 1000 });
        }
      } else {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };
  // update state value each request
  useEffect(() => {
    if (myInfo?.data?.sendFriendRequest?.includes(userId)) {
      setAlreadySend(true);
    }else{
      setAlreadySend(false);

    }
  }, [myInfo?.data?.sendFriendRequest]);


  // console.log("already send-->",alreadySend);

  return (
    <div>
      {isLoading || myDataLoading ? (
        <Button color="primary" isLoading>
          sending..
        </Button>
      ) : alreadySend ? (
        <Button
          color="primary"
          className="flex items-center gap-1"
          onClick={() => {
            handleFriendRequest();
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
            handleFriendRequest();
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
