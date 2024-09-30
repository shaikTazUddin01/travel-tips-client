import CreatePost from "@/src/components/Home/CreatePost";
import NewsFeedCard from "@/src/components/ui/newsfeed/Card";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="w-[100%] lg:w-[25%] bg-blue-400 shadow-md rounded-xl"></div>
      {/* news feed */}
      <div className="w-full lg:w-[50%] ">
        <CreatePost/>
        <div className="mt-5">
        <NewsFeedCard />
        <NewsFeedCard />
        <NewsFeedCard />
        </div>
      </div>
      {/* profile section */}
      <div className="w-full lg:w-[25%] bg-blue-400 shadow-md rounded-xl"></div>
    </div>
  );
}
