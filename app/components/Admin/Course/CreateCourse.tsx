'use client';
import React, { useEffect, useState } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import { useCreateCourseMutation } from '@/redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import CourseQuiz from '@/app/components/Admin/Course/CourseQuiz';
type Props = {};

const CreateCourse = (props: Props) => {
  const [createCourse, { isLoading, isSuccess, error }] =
    useCreateCourseMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success('Course created successfully!');
      redirect('/admin/courses');
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState(false);
  // const [currentSection, setCurrenSection] = useState('');
  const [quizData, setQuizData] = useState([]);
  const [courseInfo, setCourseInfo] = useState({
    name: '',
    description: '',
    price: '',
    estimatedPrice: '',
    tags: '',
    level: '',
    demoUrl: '',
    thumbnail: '',
    categories: '',
  });
  const [benefits, setBenefits] = useState([{ title: '' }]);
  const [prerequisites, setPrerequisites] = useState([{ title: '' }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: '',
      title: '',
      description: '',
      videoSection: 'Untitled Section',
      videoLength: '',
      links: [
        {
          title: '',
          url: '',
        },
      ],
      suggestion: '',
      quiz: [
        { time: 0, question: '', correctAnswer: 0, options: ['', '', '', ''] },
      ],
      questionCode: { question: '', answer: '' },
      quizSection: [],
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
        videoLength: courseContent.videoLength,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
        quiz: courseContent.quiz.map((item) => ({
          time: item.time,
          question: item.question,
          correctAnswer: item.correctAnswer,
          options: item.options,
        })),
        questionCode: courseContent.questionCode,
        quizSection: courseContent.quizSection,
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
      categories: courseInfo.categories,
    };
    setCourseData(data);
  };
  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    if (!isLoading) {
      await createCourse(data);
    }
  };

  // useEffect(() => {
  //   const data = courseContentData.find(
  //     (item) =>
  //       item.videoSection === currentSection && item.quizSection?.length > 0
  //   );
  //   console.log(data)
  //   setQuizData(data?.quizSection);
  // }, [currentSection]);
  // console.log(currentSection);
  console.log(courseContentData);
  console.log(quizData);
  console.log(preview)
  return !preview ? (
    <div className="w-full flex min-h-screen">
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
            setPreview={setPreview}
            preview={preview}
            setQuizData={setQuizData}
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
      <div className="w-[20%] mt-[100px] h-screen fixed top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  ) : (
    <div className="w-[100%]">
      <CourseQuiz quizData={quizData} setPreview={setPreview}/>
    </div>
  );
};

export default CreateCourse;
