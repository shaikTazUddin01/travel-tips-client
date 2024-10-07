import { useVerifyAccoutMutation } from "@/src/redux/features/userVerify/verifyApi";
import { Button } from "@nextui-org/button";
import React from "react";
import { toast } from "sonner";

const VerifyAccount = () => {
  const [accoutVerify] = useVerifyAccoutMutation();

  const handleAccountVerify = async () => {
    const toastId = toast.loading("Verifying....");
    try {
      const res = await accoutVerify({ paymentAmount: 150 });

      window.location.href = res?.data?.data?.payment_url as string;
    } catch (error: any) {
      toast.error(error?.message, { id: toastId });
    }
  };

  return (
    <div className="border-1 rounded-xl shadow-xl mb-5 p-5">
        <h1 className="text-xl font-medium">Verify Your Account</h1>
        <p className="text-sm">verify to unlock new feature and access premium content</p>
      <Button
        color="primary"
        className="w-full"
        onClick={() => handleAccountVerify()}
      >
        Verify Now
      </Button>
    </div>
  );
};

export default VerifyAccount;
