import { Card, CardHeader, Skeleton } from "@nextui-org/react";

export default function LoadingSkeletor() {
  return (
    <Card className="w-Full space-y-5 p-4 mt-5" radius="lg">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <Skeleton className="rounded-lg h-5 w-[100px]"/>
            <Skeleton className=" rounded-lg h-5 w-[90px]"/>
          </div>
        </div>
        <Skeleton className="rounded-lg h-6 w-[70px]" />
      </CardHeader>
      <div className="space-y-1">
      <Skeleton className="h-5 w-full rounded-lg bg-default-200"/>
      <Skeleton className="h-5 w-[80%] rounded-lg bg-default-200"/>
      <Skeleton className="h-5 w-[60%] rounded-lg bg-default-300"/>
      </div>

      <div >
        <Skeleton className="w-full h-[300px] rounded-lg" />
      </div>
      <div className="flex justify-between">
      <Skeleton className="w-[80px] h-5 rounded-lg"/>
      <Skeleton className="w-[80px] h-5 rounded-lg"/>
      <Skeleton className="w-[80px] h-5 rounded-lg"/>
      </div>
    </Card>
  );
}
