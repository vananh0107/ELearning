'use client';
import React from 'react';
import AdminSideBar from '@/app/components/Admin/sideBar/AdminSideBar';
import Heading from '@/app/utils/Heading';
import CourseAnalytics from '../../components/Admin/Analytics/CourseAnalytics';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="ELearning - Admin"
        description="Elearning is a platform for student to learn and get help from teachers"
        keywords="Programming, React, Next.js, TypeScript, ELearning"
      />
      <div className="flex dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSideBar/>
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <CourseAnalytics />
        </div>
      </div>
    </div>
  );
};

export default page;
