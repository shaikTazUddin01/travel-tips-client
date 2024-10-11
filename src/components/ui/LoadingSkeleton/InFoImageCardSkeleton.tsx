import { Skeleton } from "@nextui-org/react";
import React from "react";

const InFoImageCardSkeleton = () => {
  return (
    <>
      <div className="rounded-xl border shadow-xl  p-3 mt-5 md:mt-0 lg:mt-5 flex-1 ">
        <Skeleton className="h-7 w-[80px] rounded-md" />
        <div className="flex flex-wrap gap-2  mt-2 overflow-hidden">
          {Array(3)
            .fill(null)
            ?.map((_, index) => {
              return <Skeleton key={index} className="size-[97]" />;
            })}
        </div>
      </div>
    </>
  );
};

export default InFoImageCardSkeleton;
