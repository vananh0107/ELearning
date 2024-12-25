'use client';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseContent from '../../components/Course/CourseContent';
import { useGetProgressQuery } from '@/redux/features/courses/coursesApi';
const Page = () => {
  const params = useParams();
  const id = params?.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});
  const {
    data: progressData,
    isLoading: progressLoading,
    refetch: progressRefetch,
    called ,
    isUninitialized 
  } = useGetProgressQuery({ courseId: id, refetchOnMountOrArgChange: true });
  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item.courseId === id
      );
      if (!isPurchased) {
        redirect('/');
      }
      if (error) {
        redirect('/');
      }
    }
  }, [data, error]);
  return (
    <div>
      {isLoading||progressLoading ? (
        <Loader />
      ) : (
        <>
          <CourseContent
            id={id}
            called ={called }
            user={data?.user}
            isUninitialized={isUninitialized}
            progressData={progressData}
            progressLoading={progressLoading}
            progressRefetch={progressRefetch}
          />
        </>
      )}
    </div>
  );
};

export default Page;
