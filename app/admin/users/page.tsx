'use client';
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AdminSideBar from '@/app/components/Admin/sideBar/AdminSideBar';
import Heading from '@/app/utils/Heading';
import React from 'react';
import AllUsers from '../../components/Admin/Users/AllUsers';
import AdminProtected from '@/app/hooks/adminProtected';
type Props = {};

const page = (props: Props) => {
  return (
    <div className="dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black">
      <AdminProtected>
        <Heading
          title="ELearning - Admin"
          description="Elearning is a platform for student to learn and get help from teachers"
          keywords="Programming, React, Next.js, TypeScript, ELearning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSideBar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <AllUsers isTeam={false} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
