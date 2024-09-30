'use client'
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, Image, Divider} from "@nextui-org/react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";
import { FaComment } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";



export default function NewsFeedCard() {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="w-full mb-6 border">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-lg font-semibold leading-none text-default-600">Zoey Lang</h4>
            <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-0 py-0 text-small">
        <div className="px-3 pb-3">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
        </p>
        <span className="pt-2 text-default-500">
          #FrontendWithZoey 
        </span>
        </div>
        <Image
          alt="news"
          className="object-cover px-0 w-full rounded-none"
          src="https://nextui.org/images/hero-card-complete.jpeg"
        //   width={270}
        />
      </CardBody>
      <CardFooter className="gap-3 flex-col">
        <div className="flex w-full justify-between">
            <h1 className="flex items-center gap-1"><span className="text-white bg-blue-600 rounded-full p-[3px]"><AiFillLike/></span> <span>150</span></h1>
            <h1 className="flex items-center gap-1"><span><FaComment/></span> <span>50</span></h1>
        </div>
        
        <Divider/>
        <div className="flex w-full justify-between">
            <h1 className="flex items-center gap-1 hover:bg-slate-200 px-5 rounded py-2   cursor-pointer"><span className="text-xl"><AiOutlineLike /></span> <span className="">Like</span></h1>
            <h1 className="flex items-center gap-1 hover:bg-slate-200 px-5 rounded py-2  cursor-pointer"><span className="text-xl"><FaRegComment/></span> <span>Comment</span></h1>
            <h1 className="flex items-center gap-1 hover:bg-slate-200 px-5 rounded py-2  cursor-pointer"><span className="text-xl"><PiShareFat/></span> <span>Share</span></h1>
        </div>
      </CardFooter>
    </Card>
  );
}
