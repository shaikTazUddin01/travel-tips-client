import { useUnfriendMutation } from "@/src/redux/features/user/userApi";
import { TResponse } from "@/src/types";
import { Button } from "@nextui-org/button";
import React, { ReactNode } from "react";
import { toast } from "sonner";


type TProps = {
    userId: string;
    varient?:
      | "flat"
      | "shadow"
      | "solid"
      | "bordered"
      | "light"
      | "faded"
      | "ghost";
      color?:"default" | "primary" | "secondary" | "success" | "warning" | "danger";
      size?:"sm"|"md"|"lg"
      radius?:"sm" | "md" | "lg" | "none" | "full";
      icon?:ReactNode
  };

const UnFriend = ({ userId, varient="solid" ,color="primary",size="md",radius="full",icon}: TProps) => {
  // confirm request mutation
  const [unfriend, { isLoading: unfriendLoading }] =
    useUnfriendMutation();

  // handle confirm request
  const handleUnfriend = async (id: string) => {
    const toastId = toast.loading("confirm...");
    try {
      // console.log(userId);
      const res = (await unfriend(id)) as TResponse<any>;
      if (res?.data) {
        toast.success("unfriend success", { id: toastId, duration: 1000 });
      } else {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  return (
    <div>
      {
  icon ?
<Button
        className={"border-default-200"}
        color={color}
        radius={radius}
        size={size}
        
        variant={varient}
        onClick={() => handleUnfriend(userId)}
      >
        <span className="text-xl">{icon}</span>
       UnFriend
      </Button>
  :
  <Button
        className={"border-default-200"}
        color={color}
        radius={radius}
        size={size}
        
        variant={varient}
        onClick={() => handleUnfriend(userId)}
      >
        UnFriend
      </Button>
}
    </div>
  );
};

export default UnFriend;
