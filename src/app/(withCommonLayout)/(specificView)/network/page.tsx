"use client";
import AcceptRequest from "@/src/components/ui/FriendProcess/AcceptRequest";
import DeleteRequest from "@/src/components/ui/FriendProcess/DeleteRequest";
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
  
  //show all user
  const { data: alluser, isLoading: userLoading } = useAlluserQuery({});
  const allusers = alluser?.data;
  

  const moreProfile = allusers?.filter(
    (item: TUser) => !item?.sendFriendRequest?.includes(userData?.data?._id) && item?._id !==userData?.data?._id &&  !item?.myFriendList?.includes(userData?.data?._id)
  );

  // console.log(moreProfile);

  



  return (
    <div className="mt-5">
      {/* friend Rquest */}
      {
        userData?.data?.receivedFriendRequest?.length>0 &&
      
      <div>

        <h1 className="text-xl font-medium">Friend Request</h1>
        {/* request card */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
          {
            //  handle loading
            isLoading
              ? Array(4)
                  ?.fill(null)
                  ?.map((_, idx) => <RequestLoading key={`loda${idx}`} />)
              : // data feacting
                userData?.data?.receivedFriendRequest?.map(
                  (user: TUser, idx: number) => {
                    return (
                      <div
                        key={user?._id}
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
                            <AcceptRequest userId={user?._id}/>
                            <DeleteRequest userId={user?._id} />
                          </div>
                        </div>
                      </div>
                    );
                  }
                )
          }
        </div>
      </div>
}
      {/* my friends Rquest */}
      <div className="mt-10">
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
                      key={idx+1}
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
                          {user?.address?.slice(0, 20)}
                          {user?.address?.length > 20 && "..."}
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
