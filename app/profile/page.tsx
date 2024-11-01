'use client';
import React, { FC, useState } from 'react';
import Protected from '../hooks/useProtected';
import Heading from '../utils/Heading';
import Header from '../components/Header';
import Profile from '../components/Profile/Profile';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
type Props = {};

const page: FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState('Login');
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div className=" min-h-screen dark:bg-opacity-50 dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black">
      {/* <Protected> */}
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
      <Profile user={user} />
      <Footer />
      {/* </Protected> */}
    </div>
  );
};

export default page;
