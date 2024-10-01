import { Navbar } from "@/src/components/navbar";
import LeftSideBar from "@/src/components/ui/baseSidebar/LeftSideBar";
import NewsFeedCard from "@/src/components/ui/newsfeed/Card";
import { ReactNode } from "react";
// import "./style.css";
import RightSideBar from "@/src/components/ui/baseSidebar/RightSideBar";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
       <div className="mt-20">
        {children}
       </div>
      </div>
    </div>
  );
};

export default layout;
