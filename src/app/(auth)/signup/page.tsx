"use client";
import loginImage from "@/src/assets/travelLogin.jpg";
import login1 from "@/src/assets/login1.jpg";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TDForm from "@/src/components/form/TDForm";
import TDInput from "@/src/components/form/TDInput";
import { useSignupApiMutation } from "@/src/redux/features/auth/authApi";
import { toast } from "sonner";
import { TResponse } from "@/src/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import{zodResolver} from '@hookform/resolvers/zod'
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
  const [createUser, result] = useSignupApiMutation();
  const [imageFile, setImageFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  // console.log(imagePreview);
  // handle login
  const handleSignUp: SubmitHandler<FieldValues> = async (fieldsValue) => {
    console.log(fieldsValue);
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
            src={loginImage}
            className="rounded-2xl object-cover w-full h-full"
            alt="login image"
          />
        </div>
        <div className="text-center mx-auto w-[80%] p-10">
          <div className="space-y-1 mb-2">
            <h1 className="text-sky-600 text-5xl font-bold ">Wellcome</h1>
            <p>signup with your Information</p>
          </div>
          <TDForm onSubmit={handleSignUp} resolver={zodResolver(signupValidation)}>
            <div className="space-y-2 text-left">
              {/* <TDInput required={true} name="name" type="text" label="Name" /> */}
               <TDInput
                required={true}
                name="name"
                label="Name"
                type="text"
                variant="bordered"
              />
               <TDInput
                required={true}
                name="email"
                label="Email"
                type="email"
                variant="bordered"
              />
              
              <TDInput required={true} name="phoneNumber" label="Phone Number" />
              <div className="flex gap-2">
                <TDSelect
                  label="Gender"
                  name="gender"
                  options={genderOptions}
                  required={true}
                />
                <TDInput required={true} name="age" label="age" type="number" />
              </div>
              <TDInput required={true} name="address" label="Address" />
              <TDInput
                required={true}
                name="password"
                label="Password"
                type="password"
                variant="bordered"
              />

              <div className="   w-full  flex">
                <label
                  htmlFor="image"
                  className="border-2 w-full border-[#e6e6e6] text-left p-3 text-[15px] text-default-500 font-normal rounded-xl"
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
                type="file"
                id="image"
                onChange={(e) => handleImageSubmit(e)}
                className="hidden"
              />
              <div>
                {imagePreview && (
                  <div>
                    <Image
                      src={imagePreview}
                      alt="image"
                      width={150}
                      height={150}
                      className="rounded-xl object-cover size-[150px]"
                    />
                  </div>
                )}
              </div>
              <Button color="primary" className="w-full" type="submit">
                Signup
              </Button>
            </div>
          </TDForm>
          <p>
            I have an accout{" "}
            <Link
              href={"/login"}
              className="text-blue-800 mt-1 hover:text-blue-700"
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
