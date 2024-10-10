import React from 'react';

import CreatePost from '@/src/components/Home/CreatePost';
// import NewsFeedCard from '@/src/components/ui/newsfeed/Card';

const page = () => {
    return (
        <div>
            <CreatePost/>
            <div className='mt-5'>
            {/* <NewsFeedCard/> */}
            </div>
        </div>
    );
};

export default page;