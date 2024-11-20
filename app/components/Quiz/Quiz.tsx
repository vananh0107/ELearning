import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [timeLeft, setTimeLeft] = useState(3620);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false); 
  const [userAnswers, setUserAnswers] = useState([]);

  const questions = [
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
  ];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResult(true);
    }
  }, [timeLeft]);

  const handleAnswer = (index) => {
    const nextQuestion = currentQuestion + 1;
    const isCorrect = index === questions[currentQuestion].correctAnswer;

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionIndex: currentQuestion, selected: index, isCorrect },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setTimeLeft(60);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 0 ? `${hours}:` : ''}${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center  ${
        showResult
          ? 'bg-white dark:bg-gray-800 dark:text-gray-200'
          : 'dark:bg-gray-900 bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 dark:from-blue-800 dark:via-blue-900 dark:to-blue-700'
      }`}
    >
      <div
        className={`bg-white p-8 rounded-lg  max-w-2xl w-full dark:bg-gray-800 dark:text-gray-200 ${
          !showResult && 'shadow-xl'
        }`}
      >
        {showResult ? (
          <div>
            <div className="text-center">
              <h1 className="text-3xl font-extrabold mb-4 text-blue-600 dark:text-blue-400">
                Quiz Result
              </h1>
              <p className="mb-4 text-xl text-gray-700 dark:text-gray-300">
                Your score is:{' '}
                <span className="text-blue-600 font-bold dark:text-blue-400">
                  {score}
                </span>{' '}
                / {questions.length}
              </p>
              <button
                onClick={resetQuiz}
                className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:text-gray-200 hover:dark:bg-blue-600 transition duration-300"
              >
                Retry Quiz
              </button>
            </div>

            <div className="mt-6">
              {questions.map((question, index) => {
                const userAnswer = userAnswers.find(
                  (ans) => ans.questionIndex === index
                );
                return (
                  <div
                    key={index}
                    className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600"
                  >
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                      {question.question}
                    </h3>
                    <ul>
                      {question.options.map((option, optionIndex) => {
                        const isCorrect =
                          optionIndex === question.correctAnswer;
                        const isUserSelected =
                          userAnswer && userAnswer.selected === optionIndex;
                        let optionClass = '';
                        if (isUserSelected) {
                          optionClass = isCorrect
                            ? 'bg-green-300 text-green-800 dark:bg-green-600 dark:text-green-200'
                            : 'bg-red-300 text-red-800 dark:bg-red-600 dark:text-red-200';
                        } else if (isCorrect&&isUserSelected) {
                          optionClass =
                            'bg-green-300 text-green-800 dark:bg-green-600 dark:text-green-200';
                        }
                        return (
                          <li
                            key={optionIndex}
                            className={`p-2 border rounded mb-2 ${optionClass} dark:border-gray-600`}
                          >
                            {option}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Question {currentQuestion + 1} of {questions.length}
            </h1>
            <p className="text-lg mb-4 text-gray-800 dark:text-gray-200">
              {questions[currentQuestion].question}
            </p>
            <ul>
              {questions[currentQuestion].options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="cursor-pointer p-2 border rounded mb-2 hover:bg-blue-100 dark:hover:bg-blue-600 dark:text-gray-200 dark:hover:text-white"
                >
                  {option}
                </li>
              ))}
            </ul>
            <div className="text-right text-gray-600 dark:text-gray-400">
              Time Left: {formatTime(timeLeft)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
