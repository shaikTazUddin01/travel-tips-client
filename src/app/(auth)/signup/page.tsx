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

const SignUp = () => {
  const [createUser, result] = useSignupApiMutation();
  const router=useRouter()

  // handle login
  const handleSignUp: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = (await createUser(data)) as TResponse<any>;

      if (res?.data) {
        toast.success("sign up success");
        router.push("login")
      } else {
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
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
            <p>signup with your Information</p>
          </div>
          <TDForm onSubmit={handleSignUp}>
            <div className="space-y-2">
              <TDInput required={true} name="name" label="Name" />
              <TDInput required={true}
                name="email"
                label="Email"
                type="email"
                variant="bordered"
              />
              <TDInput required={true} name="phoneNumber" label="Number" />
              <TDInput required={true} name="image" label="Image" />
              <TDInput required={true} name="address" label="Address" />
              <TDInput required={true} name="gender" label="Gender" />
              <TDInput required={true}
                name="password"
                label="Password"
                type="password"
                variant="bordered"
              />
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
