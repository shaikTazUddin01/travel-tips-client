import CreatePost from "@/src/components/Home/CreatePost";
import NewsFeed from "@/src/components/ui/newsfeed/NewsFeed";

export default function Home() {

  return (
    <div className="">
      <CreatePost />
      <div className="mt-5">
        <NewsFeed/>
      </div>
      {/* profile section */}
    </div>
  );
}
