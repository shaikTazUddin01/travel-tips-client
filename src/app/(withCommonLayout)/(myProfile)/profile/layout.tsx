import React, { ReactNode } from "react";

import LeftSide from "@/src/components/ui/profile/LeftSide";
import ProfileHeader from "@/src/components/ui/profile/ProfileHeader";
import LeftSideWapper from "@/src/components/ui/profile/LeftSideWapper";

const layout = ({ children }: { children: ReactNode }) => {
  
  return (
    <div className="mx-auto">
      {/* main section */}
      <ProfileHeader />
      <div className="flex flex-col lg:flex-row items-start gap-5 mt-10">
        <div
          className="w-[100%] lg:w-[35%]  h-auto lg:sticky lg:top-20">
          <LeftSideWapper />
        </div>

        <div className="w-[100%] lg:w-[65%]">{children}</div>
      </div>
    </div>
  );
};

export default layout;
