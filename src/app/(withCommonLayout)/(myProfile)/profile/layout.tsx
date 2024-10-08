import LeftSide from "@/src/components/ui/profile/LeftSide";
import ProfileHeader from "@/src/components/ui/profile/ProfileHeader";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {/* main section */}
      <ProfileHeader />
      <div className="flex items-start gap-5 mt-10">
        <div
          className="w-[100%] lg:w-[30%]  h-auto sticky top-20">
          <LeftSide />
        </div>

        <div className="w-[70%]">{children}</div>
      </div>
    </div>
  );
};

export default layout;
