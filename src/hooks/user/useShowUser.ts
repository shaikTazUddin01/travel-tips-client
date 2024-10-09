import { useAppSelector } from "@/src/redux/hooks";

const useUser = () => {
  const user = useAppSelector((state) => state?.auth);

  return user;
};

export default useUser;
