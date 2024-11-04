import { Skeleton } from "@nextui-org/react";
import React from "react";

const RequestLoading = () => {
  return (
    <div>
      <div className="rounded-xl overflow-hidden shadow-xl">
        <Skeleton className="h-[200px] w-full" />
        <div className="space-y-1 p-2">
          <Skeleton className="h-4 w-[50%] rounded-full" />
          <Skeleton className="h-4 w-[87%] rounded-full" />

          <div className="w-full mt-1 space-y-1 flex flex-col">
            <Skeleton className="h-5 w-full rounded-xl" />
            <Skeleton className="h-5 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestLoading;
