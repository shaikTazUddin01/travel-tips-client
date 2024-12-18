"use client";
import { Avatar } from "@nextui-org/react";
import {  FaCalendarDay,  FaRegImages } from "react-icons/fa6";
import { PiArticleNyTimesFill } from "react-icons/pi";

import CreatePostModal from "./CreatePostModal";

// import { useGetMyInFoQuery } from "@/src/redux/features/user/userApi";
import useUser from "@/src/hooks/user/useShowUser";

const CreatePost = () => {
  const { user } = useUser();

  // const {data}=useGetMyInFoQuery(undefined)

  // const user=data?.data
  

  return (
    <div className="w-full  rounded-xl shadow-lg py-2 border p-2 ">
      <div className="flex gap-3 items-center">
        <Avatar
          isBordered
          radius="full"
          size="md"
          src={user?.image}
        />
        <CreatePostModal btnClass="w-full rounded-full bg-transparent border-2 flex justify-start text-sm lg:text-[17px] "
        buttonText="Post Here , What&#39;s on your Mind?" size="lg"
        />
      </div>
      <div className="h-[1px] bg-slate-300 mx-5 mt-3" />
      
      <div className="flex justify-between px-10 items-center mt-2">
        {/* <div className="flex items-center gap-2 hover:bg-slate-200 px-4 py-1 rounded-md cursor-pointer">
          <span className="text-2xl text-sky-600"><FaRegImages/></span> <span></span>
        </div> */}
        <div>
        <CreatePostModal buttonText={'Media'} icon={<FaRegImages/>} iconColor={"text-sky-600"}/>
        </div>
        <div>
        <CreatePostModal buttonText={'Event'} icon={<FaCalendarDay/>} iconColor={"text-yellow-600"}/>
        </div>
        <div className="hidden md:flex">
        <CreatePostModal buttonText={'Write artical'} icon={<PiArticleNyTimesFill/>} iconColor={"text-yellow-500"}/>
        </div>
        
        
        
      </div>
    </div>
  );
};

export default CreatePost;
