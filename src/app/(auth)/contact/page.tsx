"use client";
import Image from "next/image";
import login1 from "@/src/assets/login1.jpg";
import Link from "next/link";
import TDInput from "@/src/components/form/TDInput";
import TDForm from "@/src/components/form/TDForm";
import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import TDTextArea from "@/src/components/form/TDTextArea";
import { MdSend } from "react-icons/md";
import { SlSocialSkype } from "react-icons/sl";
import { toast } from "sonner";

const ContactPage = () => {
  // Form submission handler
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    toast.success("we successfully received your message");

    // Form submission logic here
  };

  return (
    <div
      className="min-h-screen w-full p-8 lg:p-12 bg-cover bg-gray-100"
      style={{ backgroundImage: `url(${login1.src})` }}
    >
      <div className="bg-white rounded-2xl shadow-xl mx-auto grid grid-cols-1 md:grid-cols-2 p-5 lg:p-12 gap-10 max-w-screen-lg">
        {/* Left Section: Contact Details */}
        <div className="space-y-8">
          <h2 className="text-4xl font-semibold text-gray-800">
            Contact Information
          </h2>
          <p className="text-lg text-gray-500">
            Feel free to reach out to us via the following contact details, or
            fill out the form for inquiries and support.
          </p>
          <div className="">
            <ul className="space-y-5 text-gray-600">
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-2xl " />
                <span>noorjahan road, alekanda, mohammadpur, 1207.</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-2xl " />
                <span>Second face, Sundarbans, Khulna ,9100</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-2xl " />
                <span>(+880) 15001-14475</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-2xl " />
                <a
                  href="mailto:adbsr@travertips.com"
                  className="hover:underline"
                >
                  adbsr@travertips.com
                </a>
              </li>
            </ul>

            <div className="flex space-x-4 mt-6 text-gray-600">
              <FaFacebook className="text-2xl hover:text-blue-600 cursor-pointer" />
              <FaInstagram className="text-2xl hover:text-pink-500 cursor-pointer" />
              <FaLinkedin className="text-2xl hover:text-blue-700 cursor-pointer" />
              <FaTwitter className="text-2xl hover:text-sky-500 cursor-pointer" />
              <SlSocialSkype className="text-2xl hover:text-sky-500 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Right Section: Contact Form */}
        <div>
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-500 mb-8">
            We’re here to help! Fill out the form below, and well get back to
            you as soon as possible.
          </p>

          <TDForm onSubmit={handleSubmit}>
            <div className="space-y-2">
              <TDInput
                label="Name"
                name="name"
                required={true}
                type="text"
                variant="bordered"
              />
              <TDInput
                label="Email"
                name="email"
                required={true}
                type="email"
                variant="bordered"
              />
              <TDTextArea
                label="Message"
                name="message"
                required={true}
                type="textarea"
                variant="bordered"
                placeholdertext="Write your message here.."
              />
              <Button className="w-full text-lg" type="submit" color="primary">
                <span>Send Message</span>
                <span>
                  <MdSend />
                </span>
              </Button>
            </div>
          </TDForm>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
