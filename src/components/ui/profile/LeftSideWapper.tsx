'use client'
import React from 'react';
import LeftSide from './LeftSide';
import { useGetMyPostQuery } from '@/src/redux/features/post/postApi';
import useUser from '@/src/hooks/user/useShowUser';
import { useGetMyInFoQuery } from '@/src/redux/features/user/userApi';

const LeftSideWapper = () => {
    const {data:myPost ,isLoading:iscardLoading}=useGetMyPostQuery(undefined)
//   const { user } = useUser();

  const {data:userData,isLoading:inFoLoadingg}=useGetMyInFoQuery(undefined)
//   console.log(userData?.data);

    return (
        <>
        <LeftSide myPost={myPost?.data} user={userData?.data} iscardLoading={inFoLoadingg} isImageLoading={iscardLoading}/>
        </>
    );
};

export default LeftSideWapper;