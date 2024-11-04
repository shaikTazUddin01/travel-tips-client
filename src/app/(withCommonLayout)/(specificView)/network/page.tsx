"use client";
import RequestLoading from "@/src/components/ui/LoadingSkeleton/RequestLoading";
import useUser from "@/src/hooks/user/useShowUser";
import { useConfirmRequestMutation, useGetMyInFoQuery } from "@/src/redux/features/user/userApi";
import { TResponse, TUser } from "@/src/types";
import { Button, Image } from "@nextui-org/react";
import { toast } from "sonner";

const Network = () => {
  //   const { user } = useUser();
  const { data: userData, isLoading } = useGetMyInFoQuery(undefined);
// confirm request mutation
const [confirmRequest,{isLoading:confirmRequestLoading}]=useConfirmRequestMutation()

// handle confirm request
const handleConfirm=async(id:string)=>{
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
}

  return (
    <div className="mt-5">
      {/* friend Rquest */}
      <div>
        <h1 className="text-xl font-medium">Friend Request</h1>
        {/* request card */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">

          {
        //  handle loading 
          isLoading
            ? Array(4)
                ?.fill(null)
                ?.map((_, idx) => <RequestLoading key={idx} />)
                // data feacting
            : userData?.data?.receivedFriendRequest?.map(
                (user: TUser, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="border rounded-lg shadow overflow-hidden"
                    >
                      <div className="w-full object-contain flex justify-center ">
                        <Image
                          src={user?.image}
                          alt={user?.name}
                          className="rounded-none h-[200px] w-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-small text-[#2e2e2e]">
                          {user?.address}
                        </p>
                        <div className="space-y-1 mt-1">
                          <Button
                            className="w-full text-sm"
                            color="primary"
                            size="sm"

                            onClick={()=>handleConfirm(user?._id)}
                          >
                            Confirm Request
                          </Button>
                          <Button
                            className="w-full text-sm"
                            variant="bordered"
                            size="sm"
                          >
                            Delete Request
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
        </div>
      </div>
    </div>
  );
};

export default Network;
