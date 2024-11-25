import React, { useState } from 'react';

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 2,
  },
  {
    question: 'Which language is used for web development?',
    options: ['Python', 'C++', 'JavaScript', 'Java'],
    correctAnswer: 2,
  },
  {
    question: 'Who developed the theory of relativity?',
    options: ['Newton', 'Einstein', 'Galileo', 'Tesla'],
    correctAnswer: 1,
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 2,
  },
  {
    question: 'What is the boiling point of water?',
    options: ['90°C', '100°C', '110°C', '120°C'],
    correctAnswer: 1,
  },
  {
    question: 'Who wrote "Hamlet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Homer'],
    correctAnswer: 1,
  },
  {
    question: 'Which country is known as the Land of Rising Sun?',
    options: ['China', 'Japan', 'South Korea', 'Thailand'],
    correctAnswer: 1,
  },
];

const QuizPreview = () => {
  const [questions, setQuestions] = useState(quizData);

  // Hàm để random các câu hỏi
  const handleRandomize = () => {
    const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen pt-[50px] text-gray-800 dark:text-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Total Questions: {questions.length}</h2>
        <button
          onClick={handleRandomize}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Random
        </button>
      </div>
      {questions.map((quiz, index) => (
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
    </div>
  );
};

export default QuizPreview;
