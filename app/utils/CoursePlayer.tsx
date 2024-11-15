import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  videoUrl: string;
  title: string;
};

// Dữ liệu quiz
const quizQuestions = [
  {
    time: 2, // Giây
    question: 'Câu hỏi ở phút thứ 1?',
    options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
    correctAnswer: 1, // Đáp án đúng là B
  },
  {
    time: 4, // Giây
    question: 'Câu hỏi khi hết video?',
    options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
    correctAnswer: 2, // Đáp án đúng là C
  },
];

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({ otp: '', playbackInfo: '' });
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizStatus, setQuizStatus] = useState<string | null>(null);

  // Lấy OTP và Playback info cho video
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);

  // Kiểm tra thời gian video để trigger quiz
  useEffect(() => {
    if (typeof window !== 'undefined' && window.VdoPlayer && iframeRef) {
      const player = window.VdoPlayer.getInstance(iframeRef);

      const checkTimeForQuiz = () => {
        const currentTime = Math.floor(player.video.currentTime);
        const quiz = quizQuestions.find((q) => q.time === currentTime);
        if (quiz && !isQuizActive) {
          setIsQuizActive(true);
          setCurrentQuiz(currentTime);
          player.video.pause();  // Tạm dừng video khi đến thời gian quiz
        }
      };

      const interval = setInterval(checkTimeForQuiz, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [iframeRef, isQuizActive]);

  // Xử lý khi quiz hoàn thành
  const handleQuizCompletion = () => {
    console.log("vo")
    if (
      selectedAnswer ===
      quizQuestions.find((q) => q.time === currentQuiz)?.correctAnswer
    ) {
      setQuizStatus('Correct! Well done.');
    } else {
      setQuizStatus('Sorry, that was incorrect. Better luck next time!');
    }

    setTimeout(() => {
      setIsQuizActive(false);
      setSelectedAnswer(null);
      setQuizStatus(null);
      setCurrentQuiz(null);
      console.log("vo setimeout")
      if (typeof window !== 'undefined' && window.VdoPlayer && iframeRef) {
        console.log("vo if")
        const player = window.VdoPlayer.getInstance(iframeRef);
        
        // Nhảy đến thời gian tiếp theo sau khi quiz hoàn thành
        const nextQuiz = quizQuestions.find(
          (q) => q.time > (currentQuiz || 0)
        );
        const seekToTime = nextQuiz ? nextQuiz.time : currentQuiz;
        console.log(seekToTime)
        if (seekToTime !== undefined) {
          // Sử dụng currentTime để nhảy đến đoạn video mong muốn
          player.video.currentTime = seekToTime; 

          // Đảm bảo video sẽ phát lại tự động sau khi nhảy đến thời gian
          player.video.play(); 
        }
      }
    }, 2000); 
  };

  const handleAnswerSelection = (index: number) => {
    setSelectedAnswer(index);
    setIsQuizActive(false);
  };

  return (
    <>
      {isQuizActive
        ? currentQuiz !== null && (
            <div
              className="quiz-container bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto w-full my-6"
            >
              <h2 className="text-xl font-bold mb-4">
                {quizQuestions.find((q) => q.time === currentQuiz)?.question}
              </h2>
              <div className="options space-y-2">
                {quizQuestions
                  .find((q) => q.time === currentQuiz)
                  ?.options.map((option, index) => {
                    const isCorrect =
                      index ===
                      quizQuestions.find((q) => q.time === currentQuiz)
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
                        disabled={selectedAnswer !== null} 
                      >
                        {option}
                      </button>
                    );
                  })}
              </div>
              <div className="status mt-4">
                {selectedAnswer !== null && (
                  <button
                    className="btn-submit bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={handleQuizCompletion}
                  >
                    Submit Answer
                  </button>
                )}
                {quizStatus && <p className="mt-2 text-center">{quizStatus}</p>}
              </div>
            </div>
          )
        : videoData.otp &&
          videoData.playbackInfo && (
            <div
              style={{
                paddingTop: '56.25%',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <iframe
                ref={(ref) => setIframeRef(ref)}
                src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=2t4J8zUn839edFbp`}
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                allowFullScreen={true}
                allow="encrypted-media"
              ></iframe>
            </div>
          )}
    </>
  );
};

export default CoursePlayer;
