"use client";
import useUser from "@/src/hooks/user/useShowUser";
import { Avatar, Button } from "@nextui-org/react";
import { FaCalendar,  FaCalendarDay,  FaRegImages } from "react-icons/fa6";
import { PiArticleNyTimesFill } from "react-icons/pi";
import CreatePostModal from "./CreatePostModal";

const CreatePost = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <div className="w-full  rounded-xl shadow-lg py-2 border p-2 ">
      <div className="flex gap-3 items-center">
        <Avatar
          isBordered
          radius="full"
          size="md"
          src="https://nextui.org/avatars/avatar-1.png"
        />
        <CreatePostModal buttonText="Post Here , What&#39;s on your Mind?"
        btnClass="w-full rounded-full bg-transparent border-2 flex justify-start text-[17px] " size="lg"
        />
      </div>
      <div className="h-[1px] bg-slate-300 mx-5 mt-3"></div>
      
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
        <div>
        <CreatePostModal buttonText={'Write artical'} icon={<PiArticleNyTimesFill/>} iconColor={"text-yellow-500"}/>
        </div>
        
        
        
      </div>
    </div>
  );
};

export default CreatePost;
