import { styles } from '@/app/styles/style';
import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import {
  AiOutlineDelete,
  AiOutlinePlusCircle,
  AiOutlineQuestionCircle,
} from 'react-icons/ai';
import { BsLink45Deg, BsPencil } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContent: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handlleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData?.length).fill(false)
  );
  const [activeSection, setActiveSection] = useState(1);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  const handleCollapseToggle = (index: number) => {
    const updateCollapsed = [...isCollapsed];
    updateCollapsed[index] = !updateCollapsed[index];
    setIsCollapsed(updateCollapsed);
  };
  const handleRemoveLink = (index: number, linkIndex: number) => {
    const updatedData = courseContentData.map((item, i) =>
      i === index
        ? {
            ...item,
            links: item.links.filter((_, idx) => idx !== linkIndex),
          }
        : item
    );
    setCourseContentData(updatedData);
  };
  const handleAddLink = (index: number) => {
    const updatedData = courseContentData.map((item, i) =>
      i === index
        ? {
            ...item,
            links: [...item.links, { title: '', url: '' }],
          }
        : item
    );
    setCourseContentData(updatedData);
  };
  const handleRemoveQuestion = (index: number, questionIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].quiz.splice(questionIndex, 1);
    setCourseContentData(updatedData);
  };
  const handleAddQuestion = (index: number) => {
    const updatedData = [...courseContentData];
    const updatedQuiz = [...(updatedData[index]?.quiz || [])];
    updatedQuiz.push({
      time: 0,
      question: '',
      correctAnswer: 0,
      options: ['', '', '', ''],
    });

    updatedData[index] = {
      ...updatedData[index],
      quiz: updatedQuiz,
    };

    setCourseContentData(updatedData);
  };
  const handleUpdateQuestion = (
    index: number,
    questionIndex: number,
    key: string,
    value: any
  ) => {
    const updatedData = [...courseContentData];

    updatedData[index] = {
      ...updatedData[index],
      quiz: updatedData[index].quiz.map((question, idx) => {
        if (idx === questionIndex) {
          return { ...question, [key]: value };
        }
        return question;
      }),
    };

    setCourseContentData(updatedData);
  };
  const handleUpdateTime = (
    index: number,
    questionIndex: number,
    key: string,
    value: any
  ) => {
    const updatedData = [...courseContentData];

    updatedData[index] = {
      ...updatedData[index],
      quiz: updatedData[index].quiz.map((question, qIndex) => {
        if (qIndex === questionIndex) {
          return {
            ...question,
            [key]: value,
          };
        }
        return question;
      }),
    };
    setCourseContentData(updatedData);
  };
  const handleUpdateOption = (
    index: number,
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedData = [...courseContentData];
    updatedData[index] = {
      ...updatedData[index],
      quiz: updatedData[index].quiz.map((question, qIndex) => {
        if (qIndex === questionIndex) {
          return {
            ...question,
            options: [...question.options],
          };
        }
        return question;
      }),
    };
    updatedData[index].quiz[questionIndex].options[optionIndex] = value;
    setCourseContentData(updatedData);
  };

  const handleSetCorrectAnswer = (
    index: number,
    questionIndex: number,
    answerIndex: number
  ) => {
    const updatedData = courseContentData.map((item, i) =>
      i === index
        ? {
            ...item,
            quiz: item.quiz.map((question, qIndex) =>
              qIndex === questionIndex
                ? {
                    ...question,
                    correctAnswer: answerIndex,
                  }
                : question
            ),
          }
        : item
    );
    setCourseContentData(updatedData);
  };
  const newContentHandler = (item: any) => {
    if (
      item.title === '' ||
      item.description === '' ||
      item.videoUrl === '' ||
      item.links[0].title === '' ||
      item.links[0].url === '' ||
      item.quiz[0]?.question === '' ||
      item.quiz[0]?.options[0] === '' ||
      item.quiz[0]?.options[1] === '' ||
      item.quiz[0]?.options[2] === '' ||
      item.quiz[0]?.options[3] === '' ||
      item.questionCode.question === '' ||
      item.questionCode.answer === ''
    ) {
      toast.error('Please fill all required fields');
    } else {
      console.log(item);
      let newVideoSection = '';
      if (courseContentData.length > 0) {
        const lastVideoSection = item.videoSection;
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: '',
        title: '',
        description: '',
        videoSection: newVideoSection,
        links: [{ title: '', url: '' }],
        quiz: [
          {
            time: 0,
            question: '',
            correctAnswer: 0,
            options: ['', '', '', ''],
          },
        ],
        questionCode: { question: '', answer: '' },
        videoLength: 0,
      };
      const updatedData = [...courseContentData, newContent];
      const grouped = updatedData.reduce((acc, item) => {
        if (!acc[item.videoSection]) {
          acc[item.videoSection] = [];
        }
        acc[item.videoSection].push(item);
        return acc;
      }, {});
      const uniqueSections = Array.from(
        new Set(updatedData.map((item) => item.videoSection))
      );
      const sortedData = uniqueSections.flatMap((section) => grouped[section]);
      setCourseContentData(sortedData);
    }
  };
  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1]?.title === '' ||
      courseContentData[courseContentData.length - 1]?.videoUrl === '' ||
      courseContentData[courseContentData.length - 1]?.description === '' ||
      courseContentData[courseContentData.length - 1]?.links[0].title === '' ||
      courseContentData[courseContentData.length - 1]?.links[0].url === '' ||
      courseContentData[courseContentData.length - 1]?.quiz[0]?.question ===
        '' ||
      courseContentData[courseContentData.length - 1]?.quiz[0]?.options[0] ===
        '' ||
      courseContentData[courseContentData.length - 1]?.quiz[0]?.options[1] ===
        '' ||
      courseContentData[courseContentData.length - 1]?.quiz[0]?.options[2] ===
        '' ||
      courseContentData[courseContentData.length - 1]?.quiz[0]?.options[3] ===
        ''
    ) {
      toast.error('Please fill all required fields');
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: '',
        title: '',
        description: '',
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: '', url: '' }],
        quiz: [
          {
            time: 0,
            question: '',
            correctAnswer: 0,
            options: ['', '', '', ''],
          },
        ],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === '' ||
      courseContentData[courseContentData.length - 1].videoUrl === '' ||
      courseContentData[courseContentData.length - 1].description === ''
    ) {
      toast.error("Section can't be empty!");
    } else {
      setActive(active + 1);
      handlleCourseSubmit();
    }
  };
  console.log(courseContentData);
  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div
                className={`w-full bg-[#cdc8c817] p-4 ${
                  showSectionInput ? 'mt-10' : 'mb-0'
                }`}
                key={index}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === 'Untitled Section'
                            ? 'w-[170px]'
                            : 'w-max'
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((item, i) =>
                            i === index
                              ? { ...item, videoSection: e.target.value }
                              : item
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BsPencil className="cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className="font-Poppins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div> </div>
                  )}

                  <div className="flex items-center">
                    <AiOutlineDelete
                      className={`dark:text-white text-[20px] mr-2 text-black ${
                        index > 0 ? 'cursor-pointer' : 'cursor-no-drop'
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = [...courseContentData];
                          updatedData.splice(index, 1);
                          setCourseContentData(updatedData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      fontSize="large"
                      className="dark:text-white text-black"
                      style={{
                        transform: isCollapsed[index]
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className="my-3">
                      <label className={styles.label}>Video Title</label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className={`${styles.input}`}
                        value={item.title}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  title: e.target.value,
                                }
                              : item
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={styles.label}>Video Url</label>
                      <input
                        type="text"
                        placeholder="sdder"
                        className={`${styles.input}`}
                        value={item.videoUrl}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  videoUrl: e.target.value,
                                }
                              : item
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={styles.label}>
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="20"
                        className={`${styles.input}`}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  videoLength: e.target.value,
                                }
                              : item
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className={styles.label}>Video Description</label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="sdder"
                        className={`${styles.input} !h-min`}
                        value={item.description}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  description: e.target.value,
                                }
                              : item
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div className="mb-3 block" key={linkIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={`${
                              linkIndex === 0
                                ? 'cursor-no-drop'
                                : 'cursor-pointer'
                            } text-black dark:text-white text-[20px]`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code... (Link title)"
                          className={`${styles.input}`}
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = courseContentData.map(
                              (item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      links: item.links.map((link, lIndex) =>
                                        lIndex === linkIndex
                                          ? {
                                              ...link,
                                              title: e.target.value,
                                            }
                                          : link
                                      ),
                                    }
                                  : item
                            );
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Source Code Url... (Link URL)"
                          className={`${styles.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = courseContentData.map(
                              (item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      links: item.links.map((link, lIndex) =>
                                        lIndex === linkIndex
                                          ? {
                                              ...link,
                                              url: e.target.value,
                                            }
                                          : link
                                      ),
                                    }
                                  : item
                            );
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <div className="inline-block mb-6">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className="mr-2" /> Add Link
                      </p>
                    </div>
                    <br />
                    <div className="my-3">
                      <label className={styles.label}>Question Code</label>
                      <textarea
                        rows={6}
                        cols={20}
                        placeholder="Print Hello world"
                        className={`${styles.input} !h-min`}
                        value={item.questionCode?.question}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  questionCode: {
                                    ...item.questionCode,
                                    question: e.target.value,
                                  },
                                }
                              : item
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <label className={styles.label}>
                        Expected Answer Code
                      </label>
                      <input
                        type="text"
                        placeholder="Hello world"
                        className={`${styles.input}`}
                        value={item.questionCode?.answer}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  questionCode: {
                                    ...item.questionCode,
                                    answer: e.target.value,
                                  },
                                }
                              : item
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <br />
                    {item?.quiz?.map((question: any, questionIndex: number) => (
                      <div className="mb-3 block" key={questionIndex}>
                        <div className="w-full flex items-center justify-between">
                          <label className={styles.label}>
                            Question {questionIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className="text-[20px] text-black dark:text-white cursor-pointer mt-3"
                            onClick={() =>
                              handleRemoveQuestion(index, questionIndex)
                            }
                          />
                        </div>
                        <input
                          placeholder="Enter question here..."
                          className={`${styles.input}`}
                          value={question.question}
                          onChange={(e) =>
                            handleUpdateQuestion(
                              index,
                              questionIndex,
                              'question',
                              e.target.value
                            )
                          }
                        />
                        <div className="mt-3">
                          <label className={styles.label}>Options</label>
                          {question?.options?.map(
                            (answer: string, answerIndex: number) => (
                              <div
                                key={answerIndex}
                                className="flex items-center"
                              >
                                <input
                                  type="text"
                                  placeholder={`Answer ${answerIndex + 1}`}
                                  className={`${styles.input} mr-3`}
                                  value={answer}
                                  onChange={(e) =>
                                    handleUpdateOption(
                                      index,
                                      questionIndex,
                                      answerIndex,
                                      e.target.value
                                    )
                                  }
                                />
                                <input
                                  type="radio"
                                  name={`correctAnswer-${index}-${questionIndex}`}
                                  checked={
                                    question.correctAnswer === answerIndex
                                  }
                                  onChange={() =>
                                    handleSetCorrectAnswer(
                                      index,
                                      questionIndex,
                                      answerIndex
                                    )
                                  }
                                />
                                <label className="ml-2">Correct</label>
                              </div>
                            )
                          )}
                        </div>
                        <div className="mt-3">
                          <label className={styles.label}>Time(s)</label>
                          <input
                            type="number"
                            placeholder="Enter time"
                            className={`${styles.input}`}
                            value={question.time}
                            onChange={(e) =>
                              handleUpdateTime(
                                index,
                                questionIndex,
                                'time',
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                    <div className="inline-block mb-6">
                      <p
                        className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddQuestion(index)}
                      >
                        <AiOutlineQuestionCircle className="mr-2" /> Add
                        Question
                      </p>
                    </div>

                    <br />
                    <br />
                  </>
                )}
                {/* {index === courseContentData.length - 1 && ( */}
                <div>
                  <p
                    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                    onClick={(e: any) => newContentHandler(item)}
                  >
                    <AiOutlinePlusCircle className="mr-2" /> Add New Content
                  </p>
                </div>
                {/* )} */}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor:pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <br />
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
