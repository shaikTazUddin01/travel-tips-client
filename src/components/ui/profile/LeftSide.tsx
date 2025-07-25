"use client";
// import useCurrentUser from "@/src/hooks/user/useCurrentUser";
import { MdEmail, MdLocationPin, MdPhone } from "react-icons/md";
import Image from "next/image";

import EditProfile from "./EditProfile";

// import { useGetMyPostQuery } from "@/src/redux/features/post/postApi";
// import { Image } from "@nextui-org/react";
import { TPost, TUser } from "@/src/types";
import InFoCardSkeleton from "../LoadingSkeleton/InFoCardSkeleton";
import InFoImageCardSkeleton from "../LoadingSkeleton/InFoImageCardSkeleton";
import useUser from "@/src/hooks/user/useShowUser";
// import useUser from "@/src/hooks/user/useShowUser";

const LeftSide = ({
  myPost,
  user,
  iscardLoading,
  isImageLoading,
}: {
  myPost: TPost[];
  user: TUser;
  iscardLoading?: boolean;
  isImageLoading?: boolean;
}) => {
  const { user: currentUser } = useUser();
  // const {data:myPost}=useGetMyPostQuery(undefined)
  const { email, phoneNumber, address, _id }: any = user || [];

  // console.log("my post--->", myPost);
  return (
    <div className="flex flex-col md:gap-5 lg:gap-0  justify-items-center">
      {iscardLoading ? (
        <InFoCardSkeleton />
      ) : (
        <div className="rounded-xl border shadow-lg  p-3 flex-1 ">
          <h1 className="text-[22px] font-semibold">Intro</h1>
          <div className="space-y-2 mt-2">
            <h1 className="flex items-start gap-1">
              <span className="text-xl pt-1">
                <MdEmail />
              </span>
              <span>
                sent message <span className="font-medium">{email}</span>
              </span>
            </h1>
            <h1 className="flex items-start gap-1">
              <span className="text-xl pt-1">
                <MdPhone />
              </span>
              <span>
                contact to <span className="font-medium">{phoneNumber}</span>
              </span>
            </h1>
            <h1 className="flex items-start gap-1">
              <span className="text-xl pt-1">
                <MdLocationPin />
              </span>
              <span>
                from <span className="font-medium">{address}</span>
              </span>
            </h1>
          </div>

          {currentUser?.userId == _id && (
            <div className="w-full mt-3">
              <EditProfile color="default" />
            </div>
          )}
        </div>
      )}
      {/* photos */}
      {isImageLoading ? (
        <InFoImageCardSkeleton />
      ) : (
        <div className="rounded-xl border shadow-lg  p-3 mt-5 md:mt-0 lg:mt-5 flex-1 ">
          <h1 className="text-[22px] font-semibold">Photos</h1>
          {myPost?.length > 0 ? (
            <div className="grid grid-cols-3 justify-between  gap-1 rounded-xl overflow-hidden">
              {myPost?.map(
                (item: TPost) =>
                  !item?.isThisPostShare && (
                    <div key={item?._id} className="col-span-1  border-2">
                      <Image
                        key={item?._id}
                        alt="photos"
                        className="h-20 w-full object-cover"
                        height={100}
                        src={item?.image}
                        width={100}
                      />
                    </div>
                  )
              )}
            </div>
          ) : (
            <p className="">No photo added.!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LeftSide;
