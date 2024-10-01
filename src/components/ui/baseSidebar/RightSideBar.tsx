'use client'

import MoreProfile from "../moreProfiles/MoreProfile";
import VerifyedProfile from "../moreProfiles/VerifyedProfile";

const RightSideBar = () => {
  return (
    <div>
        <div>
      <MoreProfile/>
        </div>
        <div>
            <VerifyedProfile/>
        </div>
    </div>
  );
};

export default RightSideBar;
