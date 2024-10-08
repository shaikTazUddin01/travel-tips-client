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
    <div className="flex flex-col md:flex-row lg:flex-col md:gap-5 lg:gap-0 ">
      <div className="rounded-xl border shadow-xl  p-3">
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
        <div className="w-full mt-3">
          <EditProfile color="default" />
        </div>
      </div>
      {/* photos */}
      <div className="rounded-xl border shadow-xl  p-3 mt-5">
        <h1 className="text-[22px] font-semibold">Photos</h1>
        <div className="flex flex-wrap gap-3 rounded-xl overflow-hidden">
       {myPost?.data?.map((item:TPost)=>{
        return(
            <Image src={item?.image} key={item?._id} height={100} width={100} alt="photos" className="size-[124] object-cover"/>
        )
       })}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
