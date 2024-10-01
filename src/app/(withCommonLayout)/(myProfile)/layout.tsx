
import RightSideBar from "@/src/components/ui/baseSidebar/RightSideBar";
import React, { ReactNode } from "react";

const page = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex max-w-6xl mx-auto mt-5">
      <main className="container flex mx-auto max-w-7xl px-6 gap-5">
        <div className="w-[70%]">{children}</div>
        <div
              className="w-[100%] lg:w-[30%]  h-[85vh] sticky top-20 overflow-y-auto      
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
 [&::-webkit-scrollbar-thumb]:rounded-full
 [&::-webkit-scrollbar-track]:rounded-full
            "
            >
              <RightSideBar />
            </div>
      </main>
    </div>
  );
};

export default page;
