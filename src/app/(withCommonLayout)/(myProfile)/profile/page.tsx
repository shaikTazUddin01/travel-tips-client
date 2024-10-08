"use client";
import NewsFeedCard from "@/src/components/ui/newsfeed/Card";
import CreatePost from "@/src/components/Home/CreatePost";
import { useGetMyPostQuery } from "@/src/redux/features/post/postApi";
import LoadingSkeletor from "@/src/components/ui/LoadingSkeleton/LoadingSkeleton";
import { TPost } from "@/src/types";
import ProfileHeader from "@/src/components/ui/profile/ProfileHeader";

const Profile = () => {
 
  const { data: mypost, isLoading } = useGetMyPostQuery(undefined);
  return (
    <div>
        <div >
          <CreatePost />
          {isLoading ? (
            Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index}>
                  <LoadingSkeletor />
                </div>
              ))
          ) : (
            <div className="mt-5">
              {mypost?.data?.map((data: TPost) => {
                return (
                  <div key={data?._id}>
                    <NewsFeedCard postItem={data} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Profile;
