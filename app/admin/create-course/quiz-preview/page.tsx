'use client';
import React, { useEffect, useState } from 'react';
import AdminSideBar from '@/app/components/Admin/sideBar/AdminSideBar';
import Heading from '@/app/utils/Heading';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import AdminProtected from '@/app/hooks/adminProtected';
import CourseQuiz from '@/app/components/Admin/Course/CourseQuiz';

type Props = {};

const page = (props: Props) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const quizData = localStorage.getItem('quizData');
    if (quizData) {
      setQuizzes(JSON.parse(quizData));
    }
  }, []);
  return (
    <AdminProtected>
      <div className="dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black">
        <Heading
          title="ELearning - Admin"
          description="Elearning is a platform for student to learn and get help from teachers"
          keywords="Programming, React, Next.js, TypeScript, ELearning"
        />
        <div className="flex">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSideBar />
          </div>
          <div className="w-[85%]">
            <CourseQuiz quizData={quizzes}/>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default page;
