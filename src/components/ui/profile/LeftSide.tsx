"use client";
import useCurrentUser from "@/src/hooks/user/useCurrentUser";
import { IoLocationOutline } from "react-icons/io5";
import { MdEmail, MdLocationPin, MdPhone } from "react-icons/md";
import EditProfile from "./EditProfile";
import { useGetMyPostQuery } from "@/src/redux/features/post/postApi";
// import { Image } from "@nextui-org/react";
import { TPost } from "@/src/types";
import Image from "next/image";

const LeftSide = () => {
  const user = useCurrentUser();
  const {data:myPost}=useGetMyPostQuery(undefined)
  const { email, phoneNumber, address } = user || [];

  return (
    <div className="">
      <div className="rounded-xl border shadow-xl  p-3">
        <h1 className="text-[22px] font-semibold">Intro</h1>
        <div className="space-y-1 mt-2">
          <h1 className="flex items-center gap-1">
            <span className="text-xl">
              <MdEmail />
            </span>
            <span>
              sent message <span className="font-medium">{email}</span>
            </span>
          </h1>
          <h1 className="flex items-center gap-1">
            <span className="text-xl">
              <MdPhone />
            </span>
            <span>
              contact to <span className="font-medium">{phoneNumber}</span>
            </span>
          </h1>
          <h1 className="flex items-center gap-1">
            <span className="text-xl">
              <MdLocationPin />
            </span>
            <span>
              from <span className="font-medium">{address}</span>
            </span>
          </h1>
        </div>
        <div className="w-full mt-3">
          <EditProfile color="default" />
        </div>
      </div>
      <div className="rounded-xl border shadow-xl  p-3 mt-5">
        <h1 className="text-[22px] font-semibold">Photos</h1>
        <div className="grid grid-cols-2 gap-3">
       {myPost?.data?.map((item:TPost)=>{
        return(
            <Image src={item?.image} key={item?._id} height={100} width={100} alt="photos"/>
        )
       })}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
