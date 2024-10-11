import { Skeleton } from "@nextui-org/react";

const InFoCardSkeleton = () => {
  return (
    <>
      <div className="rounded-xl border shadow-xl  p-3 flex-1 ">
        <Skeleton className="h-7 w-[70px] rounded-full" />
        <div className="space-y-2 mt-2">
          <Skeleton className="h-5 w-[95%] rounded-full" />
          <Skeleton className="h-5 w-[87%] rounded-full" />
          <Skeleton className="h-5 w-[91%] rounded-full" />

          <div className="w-full mt-3">
            <Skeleton className="h-8 w-full rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default InFoCardSkeleton;
