import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import {
  useGetCompleteMutation,
  useUpdateProgressMutation,
} from '@/redux/features/courses/coursesApi';
import { useParams } from 'next/navigation';

type Props = {
  videoUrl: string;
  title: string;
  quizQuestions?: [];
  id?: string;
  setIsNextVideo?: any;
  updateProgress?:any;
  responseCompleteData?:any
  getComplete?:any,
  dataAfterSubmit?:any
};

const CoursePlayer: FC<Props> = ({
  videoUrl,
  quizQuestions,
  id,
  setIsNextVideo,
  updateProgress,
  responseCompleteData,
  getComplete,
  dataAfterSubmit
}) => {
  const [videoData, setVideoData] = useState({ otp: '', playbackInfo: '' });
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizStatus, setQuizStatus] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const params = useParams();
  const courseId = params?.id;
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.VdoPlayer && iframeRef) {
      const player = window.VdoPlayer.getInstance(iframeRef);
      const checkTimeForQuiz = () => {
        const currentTime = Math.floor(player.video.currentTime);
        const quiz = quizQuestions.find((q) => q.time === currentTime);
        if (quiz && !isQuizActive) {
          setIsQuizActive(true);
          setCurrentQuiz(currentTime);
          player.video.pause();
        }
      };

      const handleVideoEnd = () => {
        getComplete({ courseId, contentId: id });
        // if (setIsNextVideo) {
        //   setIsNextVideo(true);
        // }
      };

      player.video.addEventListener('ended', handleVideoEnd);

      const interval = setInterval(checkTimeForQuiz, 500);
      return () => {
        clearInterval(interval);
        player.video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [iframeRef, isQuizActive, quizQuestions]);
  useEffect(()=>{
    if(responseCompleteData?.isComplete){
      setIsNextVideo(true);
    }
  },[responseCompleteData])
  const handleAnswerSelection = (index: number) => {
    setSelectedAnswer(index);
    const correctAnswer = quizQuestions.find(
      (q) => q.time === currentQuiz
    )?.correctAnswer;
    const quizId = quizQuestions.find((q) => q.time === currentQuiz)?._id;

    updateProgress({
      contentId: id,
      courseId: courseId,
      quizStatus: index === correctAnswer,
      quizId: quizId,
    });

    setQuizStatus(index === correctAnswer ? 'correct' : 'incorrect');
    setQuizAnswered(true);

    setTimeout(() => {
      if (index === correctAnswer) {
        setIsQuizActive(false);
        setQuizAnswered(false);
        setSelectedAnswer(null);
        setQuizStatus(null);

        if (typeof window !== 'undefined' && window.VdoPlayer && iframeRef) {
          const player = window.VdoPlayer.getInstance(iframeRef);
          if (currentQuiz !== null) {
            player.video.currentTime = currentQuiz + 1;
            player.video.play();
          }
        }
      } else {
        setQuizAnswered(false);
        setSelectedAnswer(null);
        setQuizStatus(null);
      }
    }, 1000);
  };
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: isQuizActive ? 'none' : 'block',
        }}
      >
        {videoData.otp && videoData.playbackInfo && (
          <iframe
            ref={(ref) => setIframeRef(ref)}
            src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=2t4J8zUn839edFbp`}
            style={{
              border: 0,
              width: '100%',
              height: '100%',
            }}
            allowFullScreen={true}
            allow="encrypted-media"
          ></iframe>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: isQuizActive ? 'block' : 'none',
          backgroundColor: 'white',
          zIndex: 10,
        }}
      >
        {currentQuiz !== null && (
          <div className="quiz-container bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-full my-[10%]">
            <h2 className="text-xl font-bold mb-4 text-black">
              {quizQuestions?.find((q) => q.time === currentQuiz)?.question}
            </h2>
            <div className="options space-y-2">
              {quizQuestions
                ?.find((q) => q.time === currentQuiz)
                ?.options.map((option, index) => {
                  const isCorrect =
                    index ===
                    quizQuestions?.find((q) => q.time === currentQuiz)
                      ?.correctAnswer;
                  const isSelected = selectedAnswer === index;
                  const optionClass = isSelected
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-900';

                  return (
                    <button
                      key={index}
                      className={`w-full p-3 rounded-lg text-left ${optionClass}`}
                      onClick={() => handleAnswerSelection(index)}
                      disabled={quizAnswered}
                    >
                      {option}
                    </button>
                  );
                })}
            </div>
            {quizStatus && (
              <div className="mt-4 text-center">
                {quizStatus === 'correct' ? (
                  <span className="text-green-600">Correct answer!</span>
                ) : (
                  <span className="text-red-600">Wrong answer!</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;
