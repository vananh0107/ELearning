'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForgotPasswordMutation } from '@/redux/features/auth/authApi';
import toast from 'react-hot-toast';
import Loader from '@/app/components/Loader/Loader';
import { AiOutlineArrowLeft } from 'react-icons/ai';
const Page = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] =
    useForgotPasswordMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response= await forgotPassword({ email });
    console.log(response)

    if(response.data?.success){
      toast.success('New password has been sent to your email')
    }
    else if(response.error){
      toast.error(response.error.data.message)
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
        <div className="hidden md:block md:w-1/2">
          <Image
            src={require('../../public/assets/forgot-password.jpg')}
            alt="Forgot Password Illustration"
            width={700}
            height={700}
            priority
          />
        </div>
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md md:w-1/2">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Forgot Password
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Enter your email and we'll send you new password.
          </p>
          {isLoading ? (
            <div className="flex justify-center my-4">
              <div className="loader"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none bg-white text-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
              >
                Submit
              </button>
            </form>
          )}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-blue-600 hover:underline flex items-center justify-center"
            >
              <>
                <AiOutlineArrowLeft className="mr-1" /> Back to Login
              </>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
