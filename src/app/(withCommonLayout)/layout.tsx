import { ReactNode } from "react";

import { Navbar } from "@/src/components/navbar";
// import "./style.css";
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
