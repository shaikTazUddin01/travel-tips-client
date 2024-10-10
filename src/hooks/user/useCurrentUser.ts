import { useAppSelector } from "@/src/redux/hooks";

const User = () => {
  const user = useAppSelector((state) => state?.auth?.user);

  return user;
};

export default User;
