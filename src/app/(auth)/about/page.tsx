"use client";
import Image from "next/image";

import loginImage from "@/src/assets/travelLogin.jpg";
import login1 from "@/src/assets/login1.jpg";

const AboutPage = () => {
 

  return (
    <div
      className=" min-h-screen w-full p-20 bg-cover"
      style={{ backgroundImage: `url(${login1.src})` }}
    >
      <div className="bg-white rounded-2xl h-full  grid grid-cols-2 shadow items-center  mx-auto">
        <div>
          <Image
            alt="login image"
            className="rounded-2xl object-cover w-full h-full"
            src={loginImage}
          />
        </div>
        <div className="text-center mx-auto w-[80%] p-10" />
      </div>
    </div>
  );
};

export default AboutPage;
