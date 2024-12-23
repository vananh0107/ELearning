import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { quietlight } from '@uiw/codemirror-theme-quietlight';
import avatarDefault from '../../../public/assets/avatar.jpg';
import Image from 'next/image';
import toast from 'react-hot-toast';
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useGetCourseDetailsQuery,
} from '@/redux/features/courses/coursesApi';
import { format } from 'timeago.js';
import { BiMessage } from 'react-icons/bi';
import { VscVerifiedFilled } from 'react-icons/vsc';
import socketIO from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa';
import CourseCompiler from '@/app/components/Course/CourseCompiler';
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
  isNextVideo?: boolean;
  setIsNextVideo?: any;
  lastLesson: any;
  updateProgress: any;
  getComplete: any;
  responseCompleteData: any;
  setQuiz: any;
  dataAfterSubmit: any;
  submitCode: any;
  loadingTestcase?: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
  isNextVideo,
  setIsNextVideo,
  lastLesson,
  updateProgress,
  getComplete,
  responseCompleteData,
  submitCode,
  dataAfterSubmit,
  setQuiz,
  loadingTestcase,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [language, setLanguage] = useState('');
  const [dataCompiler, setDataCompiler] = useState([]);
  const [code, setCode] = useState('');
  const [currentData, setCurrentData] = useState(data?.[activeVideo]?.quiz);
  const router = useRouter();
  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const {} = useGetCourseDetailsQuery(id, { refetchOnMountOrArgChange: true });
  console.log(code)
  const handleQuestion = async () => {
    if (question.trim().length === 0) {
      toast.error("Question can't be empty");
    } else {
      await addNewQuestion({
        question,
        courseId: id,
        contentId: data?.[activeVideo]._id,
      });
      toast.success('Question submitted successfully');
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setQuestion('');
      refetch();
      toast.success('Question submitted successfully');
      socketId.emit('notification', {
        title: 'New Question Received',
        message: `You have a new question in ${data?.[activeVideo].title}`,
        userId: user._id,
      });
    }
    if (error) {
      if ('data' in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);
  useEffect(() => {
    setCurrentData(data?.[activeVideo]?.quiz);
  }, [activeVideo]);

  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const handleSubmit = async () => {
    if (language) {
      const response = await submitCode({
        code,
        courseId: id,
        contentId: data?.[activeVideo]._id,
        language: language,
      });
      if (response.error) {
        setErrorCode(response.error.data.message);
      } else {
        setErrorCode('');
        setDataCompiler(response.data.results);
      }
    } else {
      toast.error('Please select a language');
    }
  };
  const [leftPanelWidth, setLeftPanelWidth] = useState(40);
  const [topSectionHeight, setTopSectionHeight] = useState(50);
  const isResizingHorizontal = useRef(false);
  const isResizingVertical = useRef(false);

  const handleMouseDownHorizontal = () => {
    isResizingHorizontal.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const handleMouseDownVertical = () => {
    isResizingVertical.current = true;
    document.body.style.cursor = 'row-resize';
  };

  const handleMouseMove = (e) => {
    if (isResizingHorizontal.current) {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 20 && newWidth < 80) {
        setLeftPanelWidth(newWidth);
      }
    }
    if (isResizingVertical.current) {
      const newHeight = (e.clientY / window.innerHeight) * 100;
      if (newHeight > 20 && newHeight < 80) {
        setTopSectionHeight(newHeight);
      }
    }
  };

  const handleMouseUp = () => {
    isResizingHorizontal.current = false;
    isResizingVertical.current = false;
    document.body.style.cursor = 'default';
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setLanguage(language);
  };
  useEffect(() => {
    getComplete({ courseId: id, contentId: data?.[activeVideo]?._id });
  }, [dataAfterSubmit, activeVideo]);
  return (
    <div className="w-[96%] 800px:w-[88%] py-4 m-auto">
      <CoursePlayer
        title={data?.[activeVideo]?.title}
        videoUrl={data?.[activeVideo]?.videoUrl}
        isPreview={false}
        quizQuestions={currentData}
        id={data?.[activeVideo]?._id}
        updateProgress={updateProgress}
        setIsNextVideo={setIsNextVideo}
        responseCompleteData={responseCompleteData}
        getComplete={getComplete}
        // dataAfterSubmit={dataAfterSubmit}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } text-white !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && '!cursor-no-drop opacity-[.8]'
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>

        <div
          className={`${
            styles.button
          } text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo + 1 >= lastLesson?.order &&
            !isNextVideo &&
            !responseCompleteData?.isActiveQuizSection &&
            '!cursor-no-drop opacity-[.8]'
          }`}
          onClick={() => {
            if (
              data?.[data?.length - 1]?._id === data?.[activeVideo]?._id &&
              data?.[data?.length - 1]?._id === responseCompleteData?.content &&
              responseCompleteData.isComplete
            ) {
              router.push(`/course-access/${id}/congratulation`);
            } else {
              setCode('')
              if (lastLesson?.order > activeVideo + 1) {
                setActiveVideo(
                  data && data?.length - 1 === activeVideo
                    ? activeVideo
                    : activeVideo + 1
                );
              } else {
                if (
                  ((isNextVideo || lastLesson.isLessonCompleted) &&
                    lastLesson?.order > activeVideo) ||
                  responseCompleteData?.isActiveQuizSection
                ) {
                  if (
                    data[activeVideo].quizSection.length > 0 &&
                    ((data?.[activeVideo]?._id ===
                      responseCompleteData?.content &&
                      !responseCompleteData?.isComplete) ||
                      !responseCompleteData)
                  ) {
                    setQuiz(data[activeVideo].quizSection);
                  } else {
                    setActiveVideo(
                      data && data?.length - 1 === activeVideo
                        ? activeVideo
                        : activeVideo + 1
                    );
                    setIsNextVideo(false);
                    updateProgress({
                      contentId: data?.[activeVideo + 1]?._id,
                      courseId: id,
                      quizStatus: null,
                      quizId: null,
                    });
                  }
                }
              }
            }
          }}
        >
          {data?.[data?.length - 1]?._id === data?.[activeVideo]?._id &&
          data?.[data?.length - 1]?._id === responseCompleteData?.content &&
          responseCompleteData?.isComplete
            ? 'Next to 🎁'
            : data?.[activeVideo]?.quizSection?.length > 0 &&
              ((data?.[activeVideo]?._id === responseCompleteData?.content &&
                !responseCompleteData?.isComplete) ||
                !responseCompleteData)
            ? 'Next Quiz'
            : 'Next Lesson'}
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black ">
        {data?.[activeVideo]?.title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {['Overview', 'Resources', 'Q&A', 'Submit Code'].map((text, index) => (
          <h5
            key={index}
            className={`800px:text-[20px]  cursor-pointer ${
              activeBar === index
                ? 'text-red-500'
                : 'dark:text-white text-black '
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
          {data?.[activeVideo]?.description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data?.[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="text-black 800px:text-[20px] 800px:inline-block dark:text-white">
                {item.title && item.title + ' :'}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={user.avatar ? user.avatar.url : avatarDefault}
              width={50}
              height={50}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <textarea
              name=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              id=""
              cols={40}
              rows={5}
              placeholder="Write your question"
              className="outline-none bg-transparent ml-3 border text-black dark:text-white dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[100px] !h-[40px] text-[16px] mt-5 rounded-lg ${
                questionCreationLoading && 'cursor-not-allowed'
              } text-white `}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full">
            <div>
              <CommentReply
                data={data}
                activeVideo={activeVideo}
                answer={answer}
                setAnswer={setAnswer}
                id={id}
                user={user}
                setQuestion={setQuestion}
                refetch={refetch}
              />
            </div>
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="flex flex-col md:flex-row  bg-gray-100 dark:bg-gray-900">
          {/* Left Panel */}
          <div
            style={{ width: `${leftPanelWidth}%` }}
            className="flex flex-col md:border-r border-gray-300 dark:border-gray-700 w-full md:w-[40%]"
          >
            {/* Top Section */}
            <div
              style={{ height: `${topSectionHeight}%` }}
              className="overflow-y-auto bg-gray-200 dark:bg-gray-800 p-4 h-auto md:h-[50%]"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Bài Tập
              </h2>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {data[activeVideo]?.questionCode?.question}
              </p>
            </div>

            {/* Resize Bar */}
            <div
              onMouseDown={handleMouseDownVertical}
              className="cursor-row-resize h-[3px] bg-gray-400 dark:bg-gray-700 hidden md:block"
            ></div>

            {/* Bottom Section */}
            <div
              style={{ height: `${100 - topSectionHeight}%` }}
              className="overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 h-auto"
            >
              {loadingTestcase ? (
                data[activeVideo]?.questionCode?.testCases?.map(
                  (testCase, testCaseIndex) => {
                    return (
                      <div
                        className="flex items-center justify-center mt-8"
                        key={testCaseIndex}
                      >
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
                        <span className="ml-2 text-black dark:text-white">
                          Running...
                        </span>
                      </div>
                    );
                  }
                )
              ) : errorCode ? (
                <div className="mt-4 bg-red-600  p-4 rounded-lg shadow-md text-white">
                  <p className="font-bold text-lg">⚠️ Error:</p>
                  <p className="mt-1">
                    {errorCode.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Testcase
                  </h2>
                  {data[activeVideo]?.questionCode?.testCases.length > 0 && (
                    <div className="mt-4">
                      {data[activeVideo]?.questionCode?.testCases?.map(
                        (testCase, testCaseIndex) => {
                          const result = dataCompiler?.find(
                            (res) => res.testCase === testCase.testCase
                          );
                          const bgColor =
                            result?.passed === true
                              ? 'bg-green-400 dark:bg-green-600'
                              : result?.passed === false
                              ? 'bg-red-100 dark:bg-red-800'
                              : testCase.isHide
                              ? 'bg-gray-300 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                              : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
                          return (
                            <div
                              key={testCaseIndex}
                              className={`p-3 rounded mb-2 shadow-sm ${bgColor}`}
                            >
                              <>
                                <p className="font-semibold flex items-center text-black dark:text-white">
                                  <span>Test Case {testCaseIndex + 1}</span>
                                  {testCase.isHide && (
                                    <span className="ml-2">
                                      <FaLock />
                                    </span>
                                  )}
                                </p>
                                <p className="text-black dark:text-white">
                                  <strong>Đầu vào:</strong>{' '}
                                  {testCase.isHide ? '' : testCase.testCase}
                                </p>
                                <p className="text-black dark:text-white">
                                  <strong>Kết quả mong đợi:</strong>{' '}
                                  {testCase.isHide
                                    ? ''
                                    : testCase.expectedResult}
                                </p>
                                {result && !testCase.isHide && (
                                  <p className="text-black dark:text-white">
                                    <strong>Kết quả thực tế:</strong>{' '}
                                    {result.actualResult}
                                  </p>
                                )}
                              </>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Resize Bar */}
          <div
            onMouseDown={handleMouseDownHorizontal}
            className="cursor-col-resize w-[3px] bg-gray-400 dark:bg-gray-700 hidden md:block"
          ></div>

          {/* Code Editor */}
          <div className="w-full md:w-[70%] mb-4">
            <div className="border-2 dark:border-0">
              <CodeMirror
                value={code}
                height="80vh"
                extensions={[javascript()]}
                onChange={(value) => setCode(value)}
                theme={isDarkMode ? darcula : quietlight}
                className="border-gray-300 rounded-lg dark:text-white text-black"
              />
            </div>
            <div className="flex justify-between items-center px-3">
              <select
                id="language-select"
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 cursor-pointer outline-none"
                onChange={handleLanguageChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Choose Language
                </option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select>
              <button
                onClick={handleSubmit}
                className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                Submit Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  id,
  setQuestion,
  refetch,
  user,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data?.[activeVideo].questions.map((item: any, index: number) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            setAnswer={setAnswer}
            item={item}
            index={index}
            answer={answer}
            id={id}
            setQuestion={setQuestion}
            refetch={refetch}
            user={user}
          />
        ))}
      </div>
    </>
  );
};
const CommentItem = ({
  item,
  answer,
  setAnswer,
  data,
  id,
  setQuestion,
  refetch,
  user,
  activeVideo,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  const [questionId, setQuestionId] = useState('');

  const [
    addAnswerInQuestion,
    { isSuccess: answerSuccess, error: answerError, isLoading: answerLoading },
  ] = useAddAnswerInQuestionMutation();

  const handleSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data?.[activeVideo]?._id,
      questionId: questionId,
    });
  };

  useEffect(() => {
    if (answerSuccess) {
      setAnswer('');
      refetch();
      toast.success('Reply submitted successfully!');
    } else if (answerError) {
      toast.error(answerError?.data?.message || 'Failed to submit reply.');
    }
  }, [answerSuccess, answerError]);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md my-2">
      {/* Comment Header */}
      <div className="flex items-start mb-3">
        <Image
          src={item?.user?.avatar?.url || avatarDefault}
          width={40}
          height={40}
          alt="Avatar"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="ml-3">
          <div className="flex items-center">
            <h5 className="font-semibold text-[16px] dark:text-white">
              {item?.user?.name}
            </h5>
            {item?.user?.role === 'admin' && (
              <VscVerifiedFilled className="ml-1 text-blue-500" />
            )}
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            {item?.question.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
          <small className="text-gray-500 dark:text-gray-400">
            {item?.createdAt
              ? format(new Date(item?.createdAt), 'dd/MM/yyyy')
              : ''}
          </small>
        </div>
      </div>

      {/* Reply Toggle */}
      <div
        className="flex items-center cursor-pointer text-blue-500 hover:text-blue-700"
        onClick={() => {
          setReplyActive(!replyActive);
          setQuestionId(item._id);
        }}
      >
        <BiMessage size={18} className="mr-1" />
        {replyActive ? 'Hide Replies' : 'View Replies'}
        <span className="ml-1">({item?.questionReplies?.length || 0})</span>
      </div>
      {replyActive && (
        <div className="mt-3 pl-10 border-gray-300 dark:border-gray-600 relative">
          {item?.questionReplies?.map((reply: any, idx: number) => (
            <div key={idx} className="flex items-start mb-3 relative">
              <div
                className={`absolute top-[-10px] left-[-30px] w-6 h-[calc(100%+12px)] border-l-2 border-gray-300 dark:border-gray-600 ${
                  idx + 1 === item?.questionReplies?.length && '!h-[28px]'
                }`}
              ></div>
              <div className="absolute top-4 left-[-30px] w-[30px] border-t-2 border-gray-300 dark:border-gray-600"></div>
              <Image
                src={reply?.user?.avatar?.url || avatarDefault}
                width={40}
                height={40}
                alt="Reply Avatar"
                className="w-[40px] h-[40px] rounded-full object-cover"
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <h5 className="font-medium text-[14px] dark:text-white">
                    {reply?.user?.name}
                  </h5>
                  {reply?.user?.role === 'admin' && (
                    <VscVerifiedFilled className="ml-1 text-blue-500" />
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {reply?.answer.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
                <small className="text-gray-500 dark:text-gray-400">
                  {format(new Date(reply?.createdAt))}
                </small>
              </div>
            </div>
          ))}
          <textarea
            rows={2}
            placeholder="Reply question"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-0 focus:border-transparent mt-4 dark:text-white dark:bg-slate-700"
            disabled={answerLoading}
          />
          <div className="flex justify-end">
            <button
              className={`ml-2 px-4 py-1 rounded text-white ${
                answer ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300'
              } text-white`}
              onClick={handleSubmit}
              disabled={!answer || answerLoading}
            >
              {answerLoading ? 'Submiting' : 'Submit'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;
