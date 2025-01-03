'use client';
import React, { FC, useEffect, useState } from 'react';
import CourseInformation from './CourseInformation';
import CourseOptions from './CourseOptions';
import CourseData from './CourseData';
import CourseContent from './CourseContent';
import CoursePreview from './CoursePreview';
import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from '@/redux/features/courses/coursesApi';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import CourseQuiz from '@/app/components/Admin/Course/CourseQuiz';
type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();
  const { data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const editCourseData =
    data && data.courses.find((course: any) => course._id === id);
  useEffect(() => {
    if (isSuccess) {
      toast.success('Course updated successfully!');
      redirect('/admin/courses');
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData.name,
        description: editCourseData.description,
        price: editCourseData.price,
        estimatedPrice: editCourseData.estimatedPrice,
        tags: editCourseData.tags,
        level: editCourseData.level,
        demoUrl: editCourseData.demoUrl,
        thumbnail: editCourseData.thumbnail,
        categories: editCourseData.categories,
      });
      setBenefits(editCourseData.benefits);
      setPrerequisites(editCourseData.prerequisites);
      setCourseContentData(editCourseData.courseContent);
    }
  }, [editCourseData]);
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
      quiz: [],
      questionCode: {},
      quizSection: [],
      timeQuizSection: 0,
    },
  ]);
  const [courseData, setCourseData] = useState({});
  const [quizData, setQuizData] = useState([]);
  const [preview, setPreview] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
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
        timeQuizSection: courseContent.timeQuizSection
          ? courseContent.timeQuizSection
          : 0,
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
      categories: courseInfo.categories,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseContent: formattedCourseContentData,
    };
    setCourseData(data);
  };
  const handleCourseCreate = async (e: any) => {
    const data = courseData;
    await editCourse({ id: editCourseData?._id, data });
  };
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
            isEdit={true}
            setCurrentSection={setCurrentSection}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  ) : (
    <div className="w-[100%]">
      <CourseQuiz
        quizData={quizData}
        setPreview={setPreview}
        courseContentData={courseContentData}
        setCourseContentData={setCourseContentData}
        currentSection={currentSection}
      />
    </div>
  );
};

export default EditCourse;
