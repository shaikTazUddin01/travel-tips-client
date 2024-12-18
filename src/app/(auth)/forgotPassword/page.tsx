/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import loginImage from "@/src/assets/travelLogin.webp";
import login1 from "@/src/assets/login1.webp";
import TDForm from "@/src/components/form/TDForm";
import TDInput from "@/src/components/form/TDInput";
import { useForgotPasswordMutation } from "@/src/redux/features/auth/authApi";
import { TResponse } from "@/src/types";
import { useAppDispatch } from "@/src/redux/hooks";
import { authInfo } from "@/src/redux/features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassValidation } from "@/src/validation/forgotPasswordValidation";
// import { userInfo } from "@/src/redux/features/auth/authSlice";

const page = () => {
  
const router=useRouter()
const [forgotpass]=useForgotPasswordMutation()
const dispatch=useAppDispatch()
  // handle login
  const handleForgotpass: SubmitHandler<FieldValues> = async (data) => {
   
    try {
      const res = (await forgotpass(data)) as TResponse<any>;
      // console.log(res?.data?.data?.accessToken);
      if (res?.data) {
        toast.success("password forgot successfully");

       
        dispatch(authInfo({ data: null, token: null }));
        router.push('/login')
        // console.log(decoded);
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error:any) {
      toast.error(error?.message);
    }
  };

  return (
    <div
      className=" min-h-screen w-full lg:p-20 bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${login1.src})` }}
    >
      <div className="bg-white rounded-2xl h-full  grid  grid-cols-1 lg:grid-cols-2 shadow items-center mx-auto ">
        <div>
          <Image
            alt="login image"
            className="rounded-2xl hidden lg:flex object-cover w-full h-full"
            src={loginImage}
          />
        </div>
        <div className="text-center mx-auto w-full lg:w-[80%] p-10">
          <div className="space-y-1 mb-2">
            <h1 className="text-sky-600 text-3xl lg:text-5xl font-bold ">Wellcome</h1>
            <p>Forgot your password</p>
          </div>
          <TDForm resolver={zodResolver(forgotPassValidation)} onSubmit={handleForgotpass}>
            <div className="space-y-2 text-left" >
              <TDInput
                label="Email"
                name="email"
                required={true}
                type="email"
                variant="bordered"
              />
             
              <TDInput
                label="New Password"
                name="newPassword"
                required={true}
                type="password"
                variant="bordered"

              />
              <Button className="w-full" color="primary" type="submit">
                Forgot Password
              </Button>
            </div>
          </TDForm>
         
        </div>
      </div>
    </div>
  );
};

export default page;
