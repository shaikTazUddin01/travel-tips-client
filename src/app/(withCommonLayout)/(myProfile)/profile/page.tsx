"use client";
import { Avatar, Button, Image } from "@nextui-org/react";
import bg from "@/src/assets/login1.jpg";
import CreatePostModal from "@/src/components/Home/CreatePostModal";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import NewsFeedCard from "@/src/components/ui/newsfeed/Card";
import CreatePost from "@/src/components/Home/CreatePost";

const page = () => {
  return (
    <div>
      {/* main section */}
      <div className="relative">
        <div
          className="h-[250px] w-100% bg-stone-200 rounded-xl object-cover bg-cover"
          style={{ backgroundImage: `url(${bg.src})` }}
        ></div>
        <div className="-mt-4 mx-5">
          <div className="flex gap-1 items-center">
            <Image
              src="https://nextui.org/avatars/avatar-1.png"
              radius="full"
              className="size-[120px] border-3 border-white"
            />
            <div className="flex justify-between items-start flex-1">
              <div>
                <h1 className="font-medium text-xl">Maisha Ahmed</h1>
                <p className="text-sm text-default-600">@tazahmedcs23</p>
                <p className="flex gap-4 text-blue-600 items-center">
                  <span>120 Followers</span>
                  {/* <span>- 150 Following</span> */}
                </p>
              </div>
              {/* button */}
              <div className="flex gap-2">
                {/*edit button  */}
                <div className="flex-1">
                  <Button
                    color="primary"
                    size="md"
                    className="flex justify-center items-center gap-1"
                  >
                    <span>
                      <MdEdit />
                    </span>
                    <span>Edit Profile</span>
                  </Button>
                </div>
                {/* create past button */}
                <div className="flex-1">
                  <CreatePostModal
                    buttonText="Create Post"
                    icon={<IoMdAdd />}
                    iconColor="text-black"
                    variant="ghost"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* content section */}
      <div className="mt-5 mx-5">
        <CreatePost/>
        <div className="mt-5">
        <NewsFeedCard />
        <NewsFeedCard />
        </div>
      </div>
    </div>
  );
};

export default page;
