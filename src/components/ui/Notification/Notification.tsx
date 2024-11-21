import {
  useGetMyNotificationQuery,
  useUpdateNotificationMutation,
} from "@/src/redux/features/notification/notificationApi";
import { INotification } from "@/src/types/notification";
import { Avatar, Link } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import NotificationSkeleton from "../LoadingSkeleton/NotificationSkeleton";
import { useEffect } from "react";

const Notification = () => {
  const [updateNotification] = useUpdateNotificationMutation();
  const { data: notifications, isLoading } =
    useGetMyNotificationQuery(undefined);

  useEffect(() => {
    const markAsRead = async () => {
      try {
        await updateNotification({});
      } catch (error) {
        console.error("Error updating notifications:", error);
      }
    };

    markAsRead();
  }, [updateNotification]);
  return (
    <div className="min-h-[85vh] max-h-[500px] w-[320px] rounded-lg bg-white shadow-lg border z-50 absolute end-5 overflow-auto -mt-1">
      <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-100">
        <h1 className="text-xl font-bold text-black">Notifications</h1>
      </div>
      <div className="px-3 py-2 space-y-3">
        {isLoading ? (
          <div className="w-full">
            <NotificationSkeleton />
          </div>
        ) : (
          notifications?.data?.map((notification: INotification) => (
            <Link
              href={`/${notification?.senderId?._id}`}
              key={notification._id}
            >
              <div className="flex items-start gap-3 rounded-md hover:bg-gray-100 transition cursor-pointer p-1">
                <Avatar
                  src={notification?.senderId?.image}
                  className="w-14 h-14  rounded-full flex-shrink-0"
                />
                <div>
                  <p className="text-sm text-black">
                    <span className="font-semibold">
                      {notification?.senderId?.name}
                    </span>{" "}
                    {(() => {
                      if (notification?.type === "follow") {
                        return "started following you";
                      } else if (notification?.type === "confirm Request") {
                        return "Accepted your friend request";
                      }
                      return "";
                    })()}
                    .
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(notification?.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
