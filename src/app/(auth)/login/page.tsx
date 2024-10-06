"use client";
import loginImage from "@/src/assets/travelLogin.jpg";
import login1 from "@/src/assets/login1.jpg";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TDForm from "@/src/components/form/TDForm";
import TDInput from "@/src/components/form/TDInput";
import { useLoginApiMutation } from "@/src/redux/features/auth/authApi";
import { TResponse } from "@/src/types";
import { toast } from "sonner";
import { decodedToken } from "@/src/utils/decodedToken";
import { useAppDispatch } from "@/src/redux/hooks";
import { authInfo } from "@/src/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
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
            src={loginImage}
            className="rounded-2xl object-cover w-full h-full"
            alt="login image"
          />
        </div>
        <div className="text-center mx-auto w-[80%] p-10">
          <div className="space-y-1 mb-2">
            <h1 className="text-sky-600 text-5xl font-bold ">Wellcome</h1>
            <p>Login with Email</p>
          </div>
          <TDForm onSubmit={handleLogin} resolver={zodResolver(loginValidation)}>
            <div className="space-y-2 text-left" >
              <TDInput
                name="email"
                label="Email"
                type="email"
                variant="bordered"
                required={true}
              />
              <TDInput
                name="password"
                label="Password"
                type="password"
                variant="bordered"
                required={true}

              />
              <Button color="primary" className="w-full" type="submit">
                Login
              </Button>
            </div>
          </TDForm>
          <p>
            I Don&#39;t have an accout.?{" "}
            <Link
              href={"/signup"}
              className="text-blue-800 mt-1 hover:text-blue-700"
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
