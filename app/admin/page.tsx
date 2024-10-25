'use client';
import React from 'react';
import Heading from '../utils/Heading';
import AdminSideBar from '../components/Admin/sideBar/AdminSideBar';
import AdminProtected from '../hooks/adminProtected';
import DashboardHero from '../components/Admin/DashboardHero';
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      {/* <AdminProtected> */}
        <Heading
          title="ELearning - Admin"
          description="Elearning is a platform for student to learn and get help from teachers"
          keywords="Programming, React, Next.js, TypeScript, ELearning"
        />
        <div className="flex h-[200vh] dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black ">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSideBar />
          </div>
          <div className="w-[85%]">
            <DashboardHero/>
          </div>
        </div>
      {/* </AdminProtected> */}
    </div>
  );
};

export default page;
