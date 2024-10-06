import { Skeleton } from "@nextui-org/react";

const ShowMoreProfileLoading = () => {
  return (
    <>
      <div className="border rounded-xl shadow-md min-h-[250px] px-3 py-3">
      <Skeleton className="text-sm rounded-full h-6 w-[70%]" />
        {Array(4)
          .fill(null)
          .map((_, index) => (
          
              <div className="flex justify-between m-4" key={index}>
                <div className="flex gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <Skeleton className="h-3 w-[90px] rounded-full" />
                    <Skeleton className="h-3 w-[80px] rounded-full" />
                  </div>
                </div>
                <Skeleton className="h-6 w-[60px] rounded-full mt-2" />
              </div>
          
          ))}
      </div>
    </>
  );
};

export default ShowMoreProfileLoading;
