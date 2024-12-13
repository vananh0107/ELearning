'use client';
import Header from '@/app/components/Header';
import Heading from '@/app/utils/Heading';
import React, { useState } from 'react';
import FAQ from '../components/FAQ/FAQ';
import Footer from '../components/Footer';
type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState('Login');
  return (
    <div className="min-h-screen dark:bg-opacity-50 dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black">
      <Heading
        title="FAQ - Elearning"
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
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
