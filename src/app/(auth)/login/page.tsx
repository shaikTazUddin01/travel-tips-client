"use client";
import loginImage from "@/src/assets/travelLogin.jpg";
import login1 from "@/src/assets/login1.jpg";
// import login2 from "@/src/assets/login2.jpg";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();

  // handle login
  const handleLogin:SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
          <form
            className="space-y-3"
            onSubmit={ handleSubmit(handleLogin)}
          >
            <Input
              type="email"
              label="email"
              variant="bordered"
              {...register("email")}
            />
            <Input
              type="password"
              label="password"
              variant="bordered"
              {...register("login")}
            />

            <Button color="primary" className="w-full" type="submit">
              Login
            </Button>
          </form>
          <p>
            I Don&#39;t have an accout{" "}
            <Link href={""} className="text-blue-800 mt-1">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
