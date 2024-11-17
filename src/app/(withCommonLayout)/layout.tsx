import { ReactNode } from "react";

// import { Navbar } from "@/src/components/navbar";
import Navbar2 from "@/src/components/ui/navbar2";
// import "./style.css";
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="relative flex flex-col min-h-screen mx-auto">
        {/* <Navbar /> */}
        <Navbar2/>
       <div className="mt-20">
        {children}
       </div>
      </div>
    </div>
  );
};

export default layout;
