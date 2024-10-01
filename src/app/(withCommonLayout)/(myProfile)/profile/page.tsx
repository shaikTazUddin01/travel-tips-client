'use client'
import { Avatar } from '@nextui-org/react';
import React from 'react';

const page = () => {
    return (
        <div>
            <div className='h-[320px] w-full bg-stone-200 rounded-xl' >
            <Avatar
                isBordered
                radius="full"
                size="lg"
                src="https://nextui.org/avatars/avatar-1.png"
              />
            </div>
        </div>
    );
};

export default page;