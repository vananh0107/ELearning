'use client';
import Header from '@/app/components/Header';
import Heading from '@/app/utils/Heading';
import React, { useState } from 'react';
import About from './About';
import Footer from '../components/Footer';
type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState('Login');
  return (
    <div className="dark:bg-opacity-50 dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black">
      <Heading
        title="About page - Elearning"
        description="Elearning is a learning management system for helping programmers."
        keywords="programming, mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <About />
      <Footer />
    </div>
  );
};

export default Page;
