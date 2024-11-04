import { Avatar, Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import UnFollow from "../followingProcess/UnFollow";

const FollowIngCard = ({ people, id }: any) => {
  // console.log(id);


  return (
    <div className="w-full px-5 mt-3">
      <div className="flex flex-col md:flex-row items-center justify-center md:items-start md:justify-between gap-2">
        <div className="flex gap-2">
        <Link href={`/${people._id}`}>
          <Avatar isBordered radius="full" size="lg" src={people?.image} />
          </Link>
          <div className="flex flex-col gap-1 items-start justify-center">
          <Link href={`/${people._id}`}>
            <h4 className="text-small font-semibold leading-none text-default-600">
              {people.name}
            </h4>
            </Link>
            <h5 className="text-small tracking-tight text-default-400">
              {/* @zoeylang */}
            </h5>
          </div>
        </div>
        <div className="flex  gap-2">
          {/* unfollowing */}
          {/* <UnFollow userId={id}/> */}
          {/* view profile */}
          <Link href={`/${people._id}`}>
            <Button className="rounded-full" color="primary" variant="flat">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
      <div className="mt-3">
        <Divider />
      </div>
    </div>
  );
};

export default FollowIngCard;
