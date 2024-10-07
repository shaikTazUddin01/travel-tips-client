"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import{zodResolver} from '@hookform/resolvers/zod'

import TDForm from "@/src/components/form/TDForm";
import TDInput from "@/src/components/form/TDInput";
import { useSignupApiMutation } from "@/src/redux/features/auth/authApi";
import { TResponse } from "@/src/types";
import login1 from "@/src/assets/login1.jpg";
import loginImage from "@/src/assets/travelLogin.jpg";
import TDSelect from "@/src/components/form/TDSelect";
import { signupValidation } from "@/src/validation/signupValidation";
// import { readFile } from "fs";

const genderOptions = [
  {
    key: "Male",
    label: "Male",
  },
  {
    key: "Female",
    label: "Female",
  },
  {
    key: "Other",
    label: "Other",
  },
];

const SignUp = () => {
  const [createUser, {isLoading}] = useSignupApiMutation();
  const [imageFile, setImageFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  // console.log(imagePreview);
  // handle login
  const handleSignUp: SubmitHandler<FieldValues> = async (fieldsValue) => {
    // console.log(fieldsValue);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(fieldsValue));
      formData.append("image", imageFile);
      const res = (await createUser(formData)) as TResponse<any>;

      if (res?.data) {
        toast.success("sign up success");
        router.push("login");
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleImageSubmit = (e: any) => {
    const file = e.target.files[0];

    setImageFile(file);
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        <div className="text-center mx-auto w-[80%] p-10">
          <div className="space-y-1 mb-2">
            <h1 className="text-sky-600 text-5xl font-bold ">Wellcome</h1>
            <p>signup with your Information</p>
          </div>
          <TDForm resolver={zodResolver(signupValidation)} onSubmit={handleSignUp}>
            <div className="space-y-2 text-left">
              {/* <TDInput required={true} name="name" type="text" label="Name" /> */}
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
              
              <TDInput label="Phone Number" name="phoneNumber" required={true} />
              <div className="flex gap-2">
                <TDSelect
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                  required={true}
                />
                <TDInput label="age" name="age" required={true} type="number" />
              </div>
              <TDInput label="Address" name="address" required={true} />
              <TDInput
                label="Password"
                name="password"
                required={true}
                type="password"
                variant="bordered"
              />

              <div className="   w-full  flex">
                <label
                  className="border-2 w-full border-[#e6e6e6] text-left p-3 text-[15px] text-default-500 font-normal rounded-xl"
                  htmlFor="image"
                >
                  {imageFile ? (
                    imageFile.name
                  ) : (
                    <span>
                      Select Profile Image
                      
                    </span>
                  )}
                </label>
              </div>
              <input
                className="hidden"
                id="image"
                type="file"
                onChange={(e) => handleImageSubmit(e)}
              />
              <div>
                {imagePreview && (
                  <div>
                    <Image
                      alt="image"
                      className="rounded-xl object-cover size-[150px]"
                      height={150}
                      src={imagePreview}
                      width={150}
                    />
                  </div>
                )}
              </div>
              {
                isLoading?
                <Button isLoading className="w-full" color="primary" />
                :
                <Button className="w-full" color="primary" type="submit">
                Signup
              </Button>
              }
              
            </div>
          </TDForm>
          <p>
            I have an accout{" "}
            <Link
              className="text-blue-800 mt-1 hover:text-blue-700"
              href={"/login"}
            >
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
