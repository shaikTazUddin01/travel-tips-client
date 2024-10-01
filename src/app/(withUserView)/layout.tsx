import { Navbar } from "@/src/components/navbar";
import LeftSideBar from "@/src/components/ui/commoleftSidebar/LeftSideBar";
import NewsFeedCard from "@/src/components/ui/newsfeed/Card";
import { ReactNode } from "react";
import"./style.css"
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl px-6 flex-grow ">
          <div className="flex flex-col lg:flex-row gap-10 ">
            {/* left sidebar */}
            <div className="w-[100%] lg:w-[25%] border shadow-md rounded-xl h-[85vh] sticky top-20 overflow-y-auto custom-sidebar">
            <LeftSideBar />
           
          </div>
            <div className="w-full lg:w-[50%] mt-20">{children}</div>
            {/* right side bar */}
            <div className="w-[100%] lg:w-[25%] border shadow-md rounded-xl h-[85vh] sticky top-20 overflow-y-auto"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default layout;
