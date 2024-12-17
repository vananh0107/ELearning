import { useShuffleQuizMutation } from '@/redux/features/courses/coursesApi';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react';

type Props = {
  quizData: [];
  setPreview: any;
  courseContentData: any;
  setCourseContentData: any;
  currentSection: any;
};
const QuizPreview: FC<Props> = ({
  quizData,
  setPreview,
  courseContentData,
  setCourseContentData,
  currentSection,
}) => {
  const [data, setData] = useState(quizData);
  const [shuffleQuiz, { data: dataTake }] = useShuffleQuizMutation();
  useEffect(() => {
    const updatedData = courseContentData.map((item, i) =>
      item.videoSection === currentSection
        ? { ...item, quizSection: dataTake?.shuffleData || data }
        : item
    );
    setCourseContentData(updatedData);
    setData(dataTake?.shuffleData || data);
  }, [dataTake]);
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen pt-[50px] text-gray-800 dark:text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Total Questions: {data.length}</h2>
      </div>
      {data.map((quiz, index) => (
        <div
          key={index}
          className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <h4 className="text-lg font-semibold mb-4">
            {index + 1}. {quiz.question}
          </h4>
          <ul className="space-y-2">
            {quiz.options.map((option, i) => (
              <li
                key={i}
                className={`p-3 rounded-md border ${
                  quiz.correctAnswer === i
                    ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-600 dark:text-green-300'
                    : 'bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="flex justify-between">
        <span
          className="px-4 py-2 bg-emerald-400 text-white rounded-md shadow transition cursor-pointer"
          onClick={() => {
            setPreview(false);
          }}
        >
          Back
        </span>
        <span
          className="px-4 py-2 bg-emerald-400 text-white rounded-md shadow transition cursor-pointer"
          onClick={() => {
            shuffleQuiz({ data });
          }}
        >
          Shuffle
        </span>
      </div>
    </div>
  );
};

export default QuizPreview;
