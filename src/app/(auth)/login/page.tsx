"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import loginImage from "@/src/assets/travelLogin.jpg";
import login1 from "@/src/assets/login1.jpg";
import TDForm from "@/src/components/form/TDForm";
import TDInput from "@/src/components/form/TDInput";
import { useLoginApiMutation } from "@/src/redux/features/auth/authApi";
import { TResponse } from "@/src/types";
import { decodedToken } from "@/src/utils/decodedToken";
import { useAppDispatch } from "@/src/redux/hooks";
import { authInfo } from "@/src/redux/features/auth/authSlice";
import { loginValidation } from "@/src/validation/loginValidation";
// import { userInfo } from "@/src/redux/features/auth/authSlice";

const Login = () => {
  const [login] = useLoginApiMutation();
  const dispatch = useAppDispatch();
const router=useRouter()
  // handle login
  const handleLogin: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = (await login(data)) as TResponse<any>;
      // console.log(res?.data?.data?.accessToken);
      if (res?.data) {
        toast.success("login success");

        const accessToken = res?.data?.data?.accessToken;
        const decoded = await decodedToken(accessToken);
        dispatch(authInfo({ data: decoded, token: accessToken }));
        router.push('/')
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
            <p>Login with Email</p>
          </div>
          <TDForm resolver={zodResolver(loginValidation)} onSubmit={handleLogin}>
            <div className="space-y-2 text-left" >
              <TDInput
                label="Email"
                name="email"
                required={true}
                type="email"
                variant="bordered"
              />
              <TDInput
                label="Password"
                name="password"
                required={true}
                type="password"
                variant="bordered"

              />
              <Button className="w-full" color="primary" type="submit">
                Login
              </Button>
            </div>
          </TDForm>
          <p>
            I Don&#39;t have an accout.?{" "}
            <Link
              className="text-blue-800 mt-1 hover:text-blue-700"
              href={"/signup"}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
