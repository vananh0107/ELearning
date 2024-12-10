'use client';
import React from 'react';
import DashboardHero from '@/app/components/Admin/DashboardHero';
import AdminProtected from '@/app/hooks/adminProtected';
import Heading from '@/app/utils/Heading';
import AdminSideBar from '@/app/components/Admin/sideBar/AdminSideBar';
import EditCategories from '../../components/Admin/Customization/EditCategories.tsx';
type Props = {};

const page = (props: Props) => {
  return (
    <div className="dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black pb-[100px]">
      <AdminProtected>
      <Heading
        title="Elearning - Admin"
        description="Elearning is a platform for students to learn and get help from teachers"
        keywords="Progammin, MERN, Redux, Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSideBar />
        </div>
        <div className="w-[85%] mt-[120px]">
          <DashboardHero />
          <EditCategories />
        </div>
      </div>
      </AdminProtected>
    </div>
  );
};

export default page;
