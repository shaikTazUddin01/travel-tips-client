import CreatePost from "@/src/components/Home/CreatePost";
import LeftSideBar from "@/src/components/ui/baseSidebar/LeftSideBar";
import NewsFeedCard from "@/src/components/ui/newsfeed/Card";

export default function Home() {
  return (
    <div className="">
      <CreatePost />
      <div className="mt-5">
        <NewsFeedCard />
        <NewsFeedCard />
        <NewsFeedCard />
      </div>
      {/* profile section */}
    </div>
  );
}
