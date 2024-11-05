'use client'
import FriendCard from '@/src/components/ui/friends/FriendCard';
import { useGetMyInFoQuery } from '@/src/redux/features/user/userApi';
import { TUser } from '@/src/types';
import { Divider } from '@nextui-org/divider';
import React from 'react';

const Friends = () => {
         const{data,isLoading}=useGetMyInFoQuery(undefined)
const mydata=data?.data

console.log(mydata);

    return (
        <div>
        <div className="border-1  w-full rounded-xl">
          <div className="p-4">
            <h1>Friends: {mydata?.myFriendList?.length ? mydata?.myFriendList?.length :"0"}</h1>
          </div>
          <Divider />
          {/* followers */}
          <div className="mt-2">
           {mydata?.myFriendList?.length > 0 ? (
              mydata?.myFriendList?.map((friend: TUser) => (
               <FriendCard key={friend?._id} friend={friend}/>
              ))
            ) : (
              <div>
                <h1 className="text-center py-2">
                  currently you have no friend.!
                </h1>
              </div>
            )}
          
          </div>
        </div>
      </div>
    );
};

export default Friends;