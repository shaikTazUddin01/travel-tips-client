'use client'
import { useGetSingleUserQuery } from '@/src/redux/features/user/userApi';
import { useAppSelector } from '@/src/redux/hooks';
import React from 'react';

const useCurrentUser = () => {
  const user = useAppSelector((state) => state.auth);
  const { data: userData } = useGetSingleUserQuery(user?.user?.userId as string);

return userData?.data
};

export default useCurrentUser;