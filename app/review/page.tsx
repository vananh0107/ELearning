'use client';
import React, { FC, useState } from 'react';
import Protected from '../hooks/useProtected';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import ReviewPage from '../components/Review/ReviewPage';
type Props = {};

const page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState('Login');
  const { user } = useSelector((state: any) => state.auth);

  const initialReviews = [
    {
      id: 1,
      rating: 5,
      comment: "They're lifesavers! Came through for me on a tight deadline.",
    },
    { id: 2, rating: 5, comment: 'Amazing service! Highly recommend them.' },
    { id: 3, rating: 4, comment: 'Great work, but some room for improvement.' },
    { id: 4, rating: 5, comment: 'Absolutely fantastic! Very professional.' },
    { id: 5, rating: 5, comment: 'Fast, reliable, and high quality work.' },
    { id: 6, rating: 3, comment: 'Decent service, but could be better.' },
    { id: 7, rating: 5, comment: 'Perfect execution of my project!' },
    { id: 8, rating: 4, comment: 'Really good experience overall.' },
  ];

  const [reviews, setReviews] = useState(initialReviews);

  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) /
    reviews.length;

  const handleAddReview = (newReview) => {
    setReviews([...reviews, { id: reviews.length + 1, ...newReview }]);
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
          averageRating={averageRating}
          totalReviews={reviews.length}
          onSubmitReview={handleAddReview}
        />
        <Footer />
      </Protected>
    </div>
  );
};

export default page;
