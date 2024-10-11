'use client'
import CreatePost from "@/src/components/Home/CreatePost";
import NewsFeed from "@/src/components/ui/newsfeed/NewsFeed";
import SearchBox from "@/src/lib/queryOperation/SearchBox";
import Sorting from "@/src/lib/queryOperation/Sorting";

export default function page() {

  return (
    <div className="">
      <div className="lg:hidden  pb-2 lg:pt-0">
     <SearchBox/>
      </div>
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
