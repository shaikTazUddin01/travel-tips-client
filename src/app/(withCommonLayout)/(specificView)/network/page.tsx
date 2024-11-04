"use client";
import useUser from "@/src/hooks/user/useShowUser";
import { useGetMyInFoQuery } from "@/src/redux/features/user/userApi";
import { TUser } from "@/src/types";
import { Button, Image } from "@nextui-org/react";

const Network = () => {
  //   const { user } = useUser();
  const { data: userData, isLoading } = useGetMyInFoQuery(undefined);

  return (
    <div className="mt-5">
      {/* friend Rquest */}
      <div>
        <h1 className="text-xl font-medium">Friend Request</h1>
        {/* request card */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-5">
          {userData?.data?.receivedFriendRequest?.map(
            (user: TUser, idx: number) => {
              console.log(user);
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
                    <p className="text-small text-[#2e2e2e]">{user?.address}</p>
                    <div className="space-y-1 mt-1">
                      <Button
                        className="w-full text-sm"
                        color="primary"
                        size="sm"
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
