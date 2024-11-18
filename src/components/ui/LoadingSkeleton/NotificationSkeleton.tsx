import { Skeleton } from "@nextui-org/react";

const NotificationSkeleton = () => {
  return (
    <div className="flex items-start gap-3  w-full">
      <Skeleton className="w-14 h-14 rounded-full " />

      <div className="flex flex-col gap-2">
        <Skeleton className="w-[180px] h-3 rounded-md bg-slate-200" />
        <Skeleton className="w-[120px] h-3 rounded-md bg-slate-200" />

        <Skeleton className="w-[130px] h-3 rounded-md bg-slate-200" />
      </div>
    </div>
  );
};

export default NotificationSkeleton;
