import { useMarkFollowingMutation } from "@/src/redux/features/following/followingApi";
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

const Follow = ({ userId, varient="solid" ,color="primary",size="sm",radius="full",icon}: TProps) => {
  const [makeFollowing] = useMarkFollowingMutation();

  // Handle following
  const handleFollowing = async (id: string) => {
    const toastId = toast.loading("loading...");
    try {
      const res = (await makeFollowing({ following: id })) as TResponse<any>;
      if (res?.data?.success) {
        toast.success("Following", { id: toastId });
      } else {
        toast.error(res?.error?.data?.message);
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
        onClick={() => handleFollowing(userId)}
      >
        <span className="text-xl">{icon}</span>
        Follow
      </Button>
  :
  <Button
        className={"border-default-200"}
        color={color}
        radius={radius}
        size={size}
        
        variant={varient}
        onClick={() => handleFollowing(userId)}
      >
        Follow
      </Button>
}

      
    </div>
  );
};

export default Follow;
