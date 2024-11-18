import { useGetMyNotificationQuery } from "@/src/redux/features/notification/notificationApi";
import { INotification } from "@/src/types/notification";
import { Avatar } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import NotificationSkeleton from "../LoadingSkeleton/NotificationSkeleton";

const Notification = () => {
  const { data: notifications, isLoading } =
    useGetMyNotificationQuery(undefined);
  console.log(notifications);
  return (
    <div className="min-h-[85vh] max-h-[500px] w-[320px] rounded-lg bg-white shadow-lg border z-50 absolute end-5 overflow-auto -mt-1">
      <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-100">
        <h1 className="text-xl font-bold text-black">Notifications</h1>
      </div>
      <div className="px-3 py-2 space-y-3">
        {isLoading ? (
            <div className="w-full">
                <NotificationSkeleton/>
            </div>
        ) : (
          notifications?.data?.map((notification: INotification) => (
            <div
              key={notification._id}
              className="flex items-start gap-3 rounded-md hover:bg-gray-100 transition cursor-pointer p-1"
            >
              <Avatar
                src={notification?.senderId?.image}
                className="w-14 h-14  rounded-full flex-shrink-0"
              />
              <div>
                <p className="text-sm text-black">
                  <span className="font-semibold">
                    {notification?.senderId?.name}
                  </span>{" "}
                  {notification?.type == "follow"
                    ? "started following you"
                    : ""}
                  .
                </p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(notification?.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
