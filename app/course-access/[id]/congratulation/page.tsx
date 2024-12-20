'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useParams } from 'next/navigation';
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import { useRouter } from 'next/navigation';
const useWindowSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

const Page = () => {
  const { width, height } = useWindowSize();
  const router = useRouter();
  const { id } = useParams();
  const { data } = useGetCourseDetailsQuery(id);
  const [totalHour, setTotalHour] = useState(0);
  useEffect(() => {
    const sum = data?.course?.courseContent.reduce(
      (total, current) => total + current.videoLength,
      0
    );
    setTotalHour(sum);
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <Confetti width={width-20} height={height-20} />
      <h1 className="text-4xl font-bold text-center animate-bounce">
        🎉 Congratulation! 🎉
      </h1>
      <p className="text-2xl mt-4 text-center">
        You have completed the{' '}
        <span className="font-bold">{data?.course?.name}</span> course in total{' '}
        <span className="font-bold">{Number(totalHour / 60).toFixed(2)}</span>{' '}
        hour study!
      </p>
      <div className="mt-8">
        <button
          onClick={() => {
            router.push(`/course-access/${id}`);
          }}
          className=" mr-[80px] px-5 py-[10px] bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-100 transition"
        >
          Back to course
        </button>
        <Link
          href={`/course/${id}/review`}
          className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-100 transition"
        >
          Write Review
        </Link>
      </div>
    </div>
  );
};

export default Page;
