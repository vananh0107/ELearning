'use client';
import React, { FC, useEffect, useState } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import { useCreateCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { redirect, useParams } from 'next/navigation';
type Props = {
  id:string;
};

const EditCourse:FC<Props> = ({id}) => {

  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();
  const {isLoading, data, refetch}=useGetAllCoursesQuery({},{refetchOnMountOrArgChange: true});
  const editCourseData=data&&data.courses.find((course:any)=>course._id===id);
  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success('Course created successfully!');
  //     redirect('/admin/all-courses');
  //   }
  //   if (error) {
  //     if ('data' in error) {
  //       const errorData = error as any;
  //       toast.error(errorData.data.message);
  //     }
  //   }
  }, [isLoading, isSuccess, error]);
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    price: '',
    estimatedPrice: '',
    tags: '',
    level: '',
    demoUrl: '',
    thumbnail: '',
  });
  const [benefits, setBenefits] = useState([{ title: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ title: '' }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: '',
      title: '',
      description: '',
      videoSection: 'Untitled Section',
      links: [
        {
          title: '',
          url: '',
        },
      ],
      suggestion: '',
    },
  ]);
  const [courseData, setCourseData] = useState({});
  const handleSubmit = async () => {
    const formattedBenefits = benefits.filter((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.filter((prerequisite) => ({
      title: prerequisite.title,
    }));
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      thumbnail: courseInfo.thumbnail,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData,
    };
    setCourseData(data);
  };
  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    if (!isLoading) {
      // await createCourse(data);
    }
  };
  return (
    <div className="w-full flex min-h-screen dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            active={active}
            setActive={setActive}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
