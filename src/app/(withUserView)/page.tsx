import NewsFeedCard from "@/src/components/ui/newsfeed/Card";

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="w-[100%] lg:w-[25%] bg-blue-400 shadow-md rounded-xl"></div>
      {/* news feed */}
      <div className="w-full lg:w-[50%]">
        <NewsFeedCard />
        <NewsFeedCard />
        <NewsFeedCard />
      </div>
      {/* profile section */}
      <div className="w-full lg:w-[25%] bg-blue-400 shadow-md rounded-xl"></div>
    </div>
  );
}
