import { ReactNode } from "react";

import LeftSideBar from "@/src/components/ui/baseSidebar/LeftSideBar";

// import "./style.css";
import RightSideBar from "@/src/components/ui/baseSidebar/RightSideBar";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="relative flex flex-col min-h-screen">
        {/* <Navbar /> */}
        <main className="container mx-auto max-w-7xl px-6 flex-grow ">
          <div className="flex flex-col lg:flex-row gap-10 ">
            {/* left sidebar */}
            <div
              className="w-[100%] lg:w-[25%] border shadow-md rounded-xl lg:h-[85vh] lg:sticky top-20 overflow-y-auto 
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
              <LeftSideBar />
            </div>
            <div className="w-full lg:w-[50%]">{children}</div>
            {/* right side bar */}
            <div
              className="w-[100%] lg:w-[25%]  h-[85vh] sticky top-20 overflow-y-auto      
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default layout;
