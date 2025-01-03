'use client';
import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Ratings from '@/app/utils/Ratings';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { format } from 'timeago.js';
import CourseContentList from '../Course/CourseContentList';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Image from 'next/image';
import avatarDefault from '../../../public/assets/avatar.jpg';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { useCreatePaymentIntentMutation } from '@/redux/features/orders/ordersApi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setRoute: any;
  setOpen: any;
  id?: string;
  userData: any;
};

const CourseDetails = ({
  data,
  setRoute,
  setOpen: openAuthModal,
  id,
  userData,
}: Props) => {
  const [createPaymentIntent, { data: responeData, isError }] =
    useCreatePaymentIntentMutation();
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);
  const discountPercentage =
    data?.estimatedPrice != 0
      ? ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100
      : 0;
  const discountPercentengePrice = discountPercentage.toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item.courseId === data._id);
  const handleOrder = async (e: any) => {
    const response = await createPaymentIntent({
      amountInfo: data?.price,
      description: 'test',
      courseId: data._id,
    });
    if (isError) {
      toast.error(response.error.data.message);
    }
    if (data?.price === 0) {
      window.location.reload();
    }
    if (response?.data?.data.shortLink) {
      router.push(response?.data?.data.shortLink);
    }
  };
  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={data?.ratings.toFixed(1)} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What you will learn from this course
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                What are the prerequisites for starting this course?
              </h1>
              {data.prerequisites?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
              <div>
                <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                  Course Overview
                </h1>
                <CourseContentList data={data?.courseContent} isDemo={true} />
              </div>
              <br />
              <br />
              <div className="w-full">
                <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                  Course Details
                </h1>
                <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                  {data.description}
                </p>
              </div>
              <br />
              <br />
              <div className="w-full">
                <div className="800px:flex items-center">
                  <Ratings rating={data?.ratings.toFixed(1)} />
                  <div className="mb-2 800px:mb-[unset]" />
                  <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                    {
                      // Number.isInteger(data?.ratings)
                      //   ? data?.ratings.toFixed(1)
                      //   : data?.ratings.toFixed(2)
                      data?.ratings.toFixed(1)
                    }{' '}
                    Course Rating • {data?.reviews?.length} Reviews
                  </h5>
                </div>
                <br />
                {(data?.reviews && [...data.reviews].reverse()).map(
                  (item: any, index: number) =>
                    index < 4 && (
                      <div className="w-full pb-4" key={index}>
                        <div className="flex">
                          <div className="w-[50px] h-[50px]">
                            <Image
                              src={
                                item.user.avatar
                                  ? item.user.avatar.url
                                  : avatarDefault
                              }
                              width={50}
                              height={50}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                          </div>
                          <div className="hidden 800px:block pl-2">
                            <div className="flex items-center">
                              <h5 className="text-[18px] pr-2 text-black dark:text-white">
                                {item.user.name}
                              </h5>
                              <Ratings rating={item.rating} />
                            </div>
                            <p className="text-black dark:text-white">
                              {item.comment}
                            </p>
                            <small className="text-[#000000d1] dark:text-[#ffffff83]">
                              {format(item.createdAt)}
                            </small>
                          </div>
                          <div className="pl-2 flex 800px:hidden items-center">
                            <h5 className="text-[18px] pr-2 text-black dark:text-white">
                              {item.user.name}
                            </h5>
                            <Ratings rating={item.rating} />
                          </div>
                        </div>
                        {item.commentReplies.map((i: any, index: number) => (
                          <div
                            className="w-full flex 800px:ml-16 my-5"
                            key={index}
                          >
                            <div className="w-[50px] h-[50px]">
                              <Image
                                src={
                                  i.user.avatar
                                    ? i.user.avatar.url
                                    : avatarDefault
                                }
                                width={50}
                                height={50}
                                alt=""
                                className="w-[50px] h-[50px] rounded-full object-cover"
                              />
                            </div>
                            <div className="pl-2">
                              <div className="flex items-center">
                                <h5 className="text-[20px]">
                                  {item.user.name}
                                </h5>
                                {item.user.role === 'admin' && (
                                  <VscVerifiedFilled className="text-[#0a6ad1] ml-2 text-[20px]" />
                                )}
                              </div>{' '}
                              <p>{i.comment}</p>
                              <small className="text-[#ffffff83]">
                                {format(i.createdAt)}
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                )}
                <div className="flex items-center justify-between">
                  <Link
                    className={`${styles.button} text-white dark:text-black !px-2 !py-2 !w-[140px] my-3 font-Poppins cursor-pointer !text-[14px]`}
                    href={`/courses`}
                  >
                    Back to courses
                  </Link>
                  <Link
                    className={`${styles.button} text-white dark:text-black !px-2 !py-2 !w-[160px] !text-[14px] my-3 font-Poppins cursor-pointer`}
                    href={`/course/${id}/review`}
                  >
                    Enter Detail Review
                  </Link>
                </div>
                <br />
              </div>
            </div>
          </div>
          <div className="w-full 800px:w-[33%] relative">
            <div className="sticky top-[100px] left-[0] z-[50] w-full">
              <CoursePlayer
                videoUrl={data?.demoUrl}
                title={data?.title}
                isPreview={true}
              />
              {!isPurchased && (
                <div className="flex items-center">
                  <h1 className="pt-5 text-[25px] text-black dark:text-white">
                    {data.price === 0 ? 'Free' : data.price + '₫'}
                  </h1>
                  {data.estimatedPrice !== 0 && (
                    <>
                      <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                        {data.estimatedPrice + '₫'}
                      </h5>
                      <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                        {discountPercentengePrice}% Off
                      </h4>
                    </>
                  )}
                </div>
              )}
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] mt-5 font-Poppins cursor-pointer`}
                    href={`/course-access/${data._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[200px] my-3 font-Poppins cursor-pointer text-white dark:text-black`}
                    onClick={handleOrder}
                  >
                    Buy Now {data.price}₫
                  </div>
                )}
              </div>
              <h3 className="text-black text-[20px] font-Poppins font-[600] dark:text-white mt-2">
                Resources included in the course:
              </h3>
              <p className="pb-1 text-black dark:text-white">
                • Source code included
              </p>
              <p className="pb-1 text-black dark:text-white">
                • Full lifetime access
              </p>
              <p className="pb-1 text-black dark:text-white">
                • Certificate of completion
              </p>
              <p className="pb-1 800px:pb-1 text-black dark:text-white">
                • Premium Support
              </p>
            </div>
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              {/* <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm setOpen={setOpen} data={data} user={user} />
                  </Elements>
                )}
              </div> */}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
