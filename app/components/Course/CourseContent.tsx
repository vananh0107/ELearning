import {
  useGetCompleteMutation,
  useGetCourseContentQuery,
  useSubmitCodeMutation,
  useUpdateProgressMutation,
} from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import CourseContentMedia from '../../components/Course/CourseContentMedia';
import Header from '../Header';
import CourseContentList from './CourseContentList';
import Quiz from '@/app/components/Quiz/Quiz';
type Props = {
  id: string;
  user: any;
  progressData: any;
  progressLoading: any;
  progressRefetch: any;
  called ?:any;
  isUninitialized?:any
};

const CourseContent = ({
  id,
  user,
  progressData,
  progressLoading,
  progressRefetch,
  called ,
  isUninitialized
}: Props) => {
  const {
    data: contentData,
    isLoading,
    refetch,
  } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });
  const [updateProgress, { data: dataAfterQuiz }] = useUpdateProgressMutation();
  const [submitCode, { data: dataAfterSubmit, isLoading:loadingTestcase }] = useSubmitCodeMutation();
  const [getComplete, { data: responseCompleteData }] =
    useGetCompleteMutation();
  const data = contentData?.content;
  const [activeVideo, setActiveVideo] = useState(
    progressData ? progressData.lastLesson.order - 1 : 0
  );
  const [open, setOpen] = useState(false);
  const [isNextVideo, setIsNextVideo] = useState(false);
  const [route, setRoute] = useState('Login');
  const [quiz, setQuiz] = useState([]);
  useEffect(() => {
    if (dataAfterQuiz||dataAfterSubmit) {
    //   console.log('object')
      progressRefetch();
    }
  }, [dataAfterQuiz, dataAfterSubmit]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black min-h-screen">
          <Header
            activeItem={1}
            open={open}
            setOpen={setOpen}
            route={route}
            setRoute={setRoute}
          />
          {quiz.length > 0 ? (
            <Quiz
              questions={quiz}
              setActiveVideo={setActiveVideo}
              activeVideo={activeVideo}
              setIsNextVideo={setIsNextVideo}
              updateProgress={updateProgress}
              data={data}
              id={id}
              setQuiz={setQuiz}
              section={data?.[activeVideo]?.videoSection}
            />
          ) : (
            <div className="w-full grid 800px:grid-cols-10">
              <Heading
                title={data?.[activeVideo]?.title}
                description="anything"
                keywords={data?.[activeVideo]?.tags}
              />
              <div className="col-span-7">
                <CourseContentMedia
                  submitCode={submitCode}
                  dataAfterSubmit={dataAfterSubmit}
                  setQuiz={setQuiz}
                  updateProgress={updateProgress}
                  isNextVideo={isNextVideo}
                  setIsNextVideo={setIsNextVideo}
                  lastLesson={progressData?.lastLesson}
                  data={data}
                  id={id}
                  activeVideo={activeVideo}
                  setActiveVideo={setActiveVideo}
                  user={user}
                  refetch={refetch}
                  getComplete={getComplete}
                  responseCompleteData={responseCompleteData}
                  loadingTestcase={loadingTestcase}
                  progressRefetch={progressRefetch}
                />
              </div>
              <div className="hidden 800px:block 800px:col-span-3">
                <CourseContentList
                  isNextVideo={isNextVideo}
                  setIsNextVideo={setIsNextVideo}
                  setActiveVideo={setActiveVideo}
                  lastLesson={progressData?.lastLesson}
                  data={data}
                  activeVideo={activeVideo}
                  responseCompleteData={responseCompleteData}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CourseContent;
