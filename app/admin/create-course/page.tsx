'use client';
import React from 'react';
import AdminSideBar from '@/app/components/Admin/sideBar/AdminSideBar';
import Heading from '@/app/utils/Heading';
import CreateCourse from '../../components/Admin/Course/CreateCourse';
import DashboardHeader from '@/app/components/Admin/DashboardHeader';
import AdminProtected from '@/app/hooks/adminProtected';
type Props = {};

const page = (props: Props) => {
  return (
    <AdminProtected>
      <div className="dark:bg-gradient-to-b dark:from-gray-900 dark:to-black">
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
            <DashboardHeader />
            <CreateCourse />
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default page;
