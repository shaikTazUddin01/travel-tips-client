"use client";
import SendRequest from "@/src/components/ui/FriendProcess/SendRequest";
import RequestLoading from "@/src/components/ui/LoadingSkeleton/RequestLoading";
import useUser from "@/src/hooks/user/useShowUser";
import {
  useAlluserQuery,
  useConfirmRequestMutation,
  useGetMyInFoQuery,
} from "@/src/redux/features/user/userApi";
import { TResponse, TUser } from "@/src/types";
import { Button, Image, Link } from "@nextui-org/react";
import { toast } from "sonner";

const Network = () => {
  //   const { user } = useUser();
  const { data: userData, isLoading } = useGetMyInFoQuery(undefined);
  // confirm request mutation
  const [confirmRequest, { isLoading: confirmRequestLoading }] =
    useConfirmRequestMutation();
  //show all user
  const { data: alluser, isLoading: userLoading } = useAlluserQuery({});
  const allusers = alluser?.data;
  // console.log(allusers);

  const moreProfile = allusers?.filter(
    (item: TUser) => !item?.sendFriendRequest?.includes(userData?.data?._id)
  );

  // console.log(moreProfile);

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
              : // data feacting
                userData?.data?.receivedFriendRequest?.map(
                  (user: TUser, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className="border rounded-lg shadow overflow-hidden"
                      >
                        <div className="w-full object-contain flex justify-center ">
                          <Link href={`/${user?._id}`}>
                            <Image
                              src={user?.image}
                              alt={user?.name}
                              className="rounded-none h-[200px] w-full object-cover"
                            />
                          </Link>
                        </div>
                        <div className="p-2">
                          <Link
                            href={`/${user?._id}`}
                            className="text-default-800"
                          >
                            <p className="font-medium">{user?.name}</p>
                          </Link>
                          <p className="text-small text-[#2e2e2e]">
                            {user?.address}
                          </p>
                          <div className="space-y-1 mt-1">
                            <Button
                              className="w-full text-sm"
                              color="primary"
                              size="sm"
                              onClick={() => handleConfirm(user?._id)}
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
                )
          }
        </div>
      </div>
      {/* my friends Rquest */}
      <div className="mt-5">
        <h1 className="text-xl font-medium">Find More Friend</h1>

        {/* request card */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
          {
            //  handle loading
            isLoading
              ? Array(4)
                  ?.fill(null)
                  ?.map((_, idx) => <RequestLoading key={idx} />)
              : // data feacting
                moreProfile?.map((user: TUser, idx: number) => {
                  return (
                    <div
                      key={idx}
                      className="border rounded-lg shadow overflow-hidden"
                    >
                      <div className="w-full object-contain flex justify-center ">
                        <Link href={`/${user?._id}`}>
                          <Image
                            src={user?.image}
                            alt={user?.name}
                            className="rounded-none h-[200px] w-full object-cover"
                          />
                        </Link>
                      </div>
                      <div className="p-2">
                        <Link
                          href={`/${user?._id}`}
                          className="text-default-800"
                        >
                          <p className="font-medium">{user?.name}</p>
                        </Link>
                        <p className="text-small text-[#2e2e2e]">
                          {user?.address?.slice(0,20)}{user?.address?.length>20 && "..."}
                        </p>
                        <div className="space-y-1 mt-1 w-full">
                          <SendRequest userId={user?._id} />
                        </div>
                      </div>
                    </div>
                  );
                })
          }
        </div>
      </div>
    </div>
  );
};

export default Network;
