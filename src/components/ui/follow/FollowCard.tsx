import { Avatar, Button, Divider } from '@nextui-org/react';
import React from 'react';

const FollowCard = () => {
    return (
        <div className="w-full px-5 mt-3">
          <div className="flex items-start justify-between">
            <div className="flex gap-1">
              <Avatar
                isBordered
                radius="full"
                size="lg"
                src="https://nextui.org/avatars/avatar-1.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Zoey Lang
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  @zoeylang
                </h5>
              </div>
            </div>
            <Button variant="bordered" className="rounded-full">Unfollow</Button>
          </div>
          <div className="mt-3">
          <Divider/>
          </div>
        </div>
      
    );
};

export default FollowCard;