'use client';
import React, { FC, useEffect, useState } from 'react';
import Heading from './utils/Heading';
import Header from './components/Header';
import Courses from './components/Route/Courses';
import Reviews from './components/Route/Reviews';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer';
import Hero from './components/Route/Hero';
interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState('Login');
  return (
    <div className="dark:bg-opacity-50 dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black">
      <Heading
        title="ELearning"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
