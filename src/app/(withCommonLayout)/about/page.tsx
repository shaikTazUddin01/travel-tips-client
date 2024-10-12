"use client";
import { Card, Image } from "@nextui-org/react";
import { AiFillCodepenCircle, AiFillSlackCircle } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

import loginImage from "@/src/assets/travelLogin.jpg";
import login1 from "@/src/assets/login1.jpg";

const page = () => {
  return (
    <div
      className="min-h-[95vh] -mt-10 w-full bg-cover p-5 lg:p-0 flex justify-center items-center"
      style={{ backgroundImage: `url(${login1.src})` }}
    >
      <div className="bg-white rounded-2xl shadow-xl mx-auto  p-5 md:p-10 lg:p-8  max-w-screen-lg mt-8">
        {/* first section */}
        <div className="grid grid-cols-1  md:grid-cols-2 gap-1 justify-between">
          {/* left */}
          <div className="order-last md:order-first">
            <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-4">
              About Us
            </h2>
            <p className="text-[15px] text-gray-700">
              The &quot;Travel Tips & Destination Guides&quot; platform connects
              travel enthusiasts to share stories, tips, and interact with
              others. Users can personalize profiles, follow others, and access
              premium content via payment integration.
            </p>
            <div className="flex gap-2 flex-col md:flex-row items-center justify-center mt-10">
              <Card className="flex justify-center items-center border-2 flex-1">
                <div className="text-3xl text-center pt-2">
                  <AiFillCodepenCircle />
                </div>
                <div>
                  <p className="text-center p-1 text-sm">To build a vibrant community of travel enthusiasts.</p>
                </div>
              </Card>
              <Card className="flex justify-center items-center border-2 flex-1">
                <div className="text-3xl text-center pt-2">
                  <AiFillSlackCircle />
                </div>
                <div>
                  <p className="text-center p-1 text-sm">To become a leading platform for global travel inspiration
                  .</p>
                </div>
              </Card>
              <Card className="flex flex-col justify-center items-center border-2 flex-1" >
                <div className="text-3xl text-center pt-2">
                  <FaEye />
                </div>
                <div>
                  <p className="text-center p-1 text-sm">To grow an active user base of travel enthusiasts.
                  </p>
                </div>
              </Card>
            </div>
          </div>
          {/* right */}
          <div>
            <Image src={loginImage.src} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
