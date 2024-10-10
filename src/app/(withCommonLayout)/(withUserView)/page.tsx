'use client'
import CreatePost from "@/src/components/Home/CreatePost";
import NewsFeed from "@/src/components/ui/newsfeed/NewsFeed";
import Sorting from "@/src/lib/queryOperation/Sorting";

export default function Home() {

  return (
    <div className="">
      <CreatePost />
      {/* sorting */}
      <div className="lg:hidden  pt-5 lg:pt-0">
      <Sorting />
      </div>
      <div className="mt-5">
        <NewsFeed/>
      </div>
      
    </div>
  );
}
