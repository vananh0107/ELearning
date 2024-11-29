'use client';
import React, { FC, useEffect, useState } from 'react';
import Protected from '@/app/hooks/useProtected';
import Heading from '@/app/utils/Heading';
import Header from '@/app/components/Header';
import { useSelector } from 'react-redux';
import Footer from '@/app/components/Footer';
import ReviewPage from '@/app/components/Review/ReviewPage';
import {
  useAddReviewInCourseMutation,
  useGetReviewCourseQuery,
} from '@/redux/features/courses/coursesApi';

const Page = ({ params }: any) => {
  const { data } = useGetReviewCourseQuery(params.id, {});
  const [addReviewInCourse, { data: dataTake , isSuccess}] =

    useAddReviewInCourseMutation();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [route, setRoute] = useState('Login');
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (dataTake) setReviews(dataTake.review);
    else if (data) {
      setReviews(data.review);
    }
  }, [dataTake,data]);
  const handleAddReview = (newReview: any) => {
    addReviewInCourse({
      review: newReview.comment,
      rating: newReview.rating,
      courseId: params.id,
    });
  };
  return (
    <div className="min-h-screen dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black">
      <Protected>
        <Heading
          title={`${user?.name} profile - ELearning`}
          description="Elearning is a platform for student to learn and get help from teachers"
          keywords="Programming, React, Next.js, TypeScript, ELearning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <ReviewPage
          reviews={reviews}
          totalReviews={reviews?.length}
          onSubmitReview={handleAddReview}
        />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
