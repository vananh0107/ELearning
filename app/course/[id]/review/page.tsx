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
import toast from 'react-hot-toast';

const Page = ({ params }: any) => {
  const { data, refetch } = useGetReviewCourseQuery(params.id, {});
  const [addReviewInCourse, {}] = useAddReviewInCourseMutation();
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [route, setRoute] = useState('Login');
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    setReviews(data?.review);
  }, [data]);
  const handleAddReview = async (newReview: any) => {
    const respone = await addReviewInCourse({
      review: newReview.comment,
      rating: newReview.rating,
      courseId: params.id,
    });
    if (respone.error) {
      toast.error(respone.error.data.message);
      return;
    }
    refetch();
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
