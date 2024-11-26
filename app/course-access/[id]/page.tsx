'use client';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import CourseContent from '../../components/Course/CourseContent';
const Page = () => {
  const params = useParams();
  const id = params?.id;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CourseContent id={id} user={data.user} />
        </>
      )}
    </div>
  );
};

export default Page;
