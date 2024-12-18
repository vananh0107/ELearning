import React, { FC, useState, useEffect } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
  lastLesson?: any;
  setIsNextVideo?: any;
  isNextVideo?: any;
  responseCompleteData?: any;
};

const CourseContentList: FC<Props> = (props) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  const videoSections: string[] = [
    ...new Set<string>(props.data?.map((item: any) => item.videoSection)),
  ];

  const [lockedVideos, setLockedVideos] = useState<Set<number>>(new Set());
  let totalCount: number = 0;
  useEffect(() => {
    if (props.lastLesson?.contentId) {
      let activeVideoIndex = props.data?.findIndex(
        (item: any) => item._id === props.lastLesson.contentId
      );
      if (activeVideoIndex !== -1) {
        // props.setActiveVideo(activeVideoIndex);
        const lockedSet = new Set<number>();
        if (props.isNextVideo) {
          activeVideoIndex += 1;
        }
        for (let i = activeVideoIndex + 1; i < props.data.length; i++) {
          lockedSet.add(i);
        }
        setLockedVideos(lockedSet);
      }
    }
  }, [props.lastLesson, props.data, props.isNextVideo]);

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`mt-[30px] w-full ${
        !props.isDemo && 'ml-[-30px] sticky top-24 left-0 z-30'
      }`}
    >
      {videoSections.map((section: string, sectionIndex: number) => {
        const isSectionVisible = visibleSections.has(section);
        const sectionVideos: any[] = props.data.filter(
          (item: any) => item.videoSection === section
        );
        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );
        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;
        const sectionContentHours: number = sectionVideoLength / 60;

        return (
          <div
            className={`${'border-b dark:border-[#ffffff8e] pb-2 border-[#0e0d0dab]'}`}
            key={sectionIndex}
          >
            <div className="w-full flex justify-between items-center mt-4">
              <h2 className="text-[22px] text-black dark:text-white">
                {section}
              </h2>
              <button
                className="cursor-pointer text-black dark:text-white"
                onClick={() => toggleSection(section)}
              >
                {isSectionVisible ? (
                  <BsChevronUp size={20} />
                ) : (
                  <BsChevronDown size={20} />
                )}
              </button>
            </div>
            <h5 className="text-black dark:text-white">
              {sectionVideoCount} Lessons •{' '}
              {sectionContentHours < 1
                ? `${sectionVideoLength} minutes`
                : `${sectionContentHours.toFixed(2)} hours`}
            </h5>
            <br />
            {isSectionVisible && (
              <div className="w-full">
                {sectionVideos.map((item, index) => {
                  const videoIndex = sectionStartIndex + index;
                  const isLocked = lockedVideos.has(videoIndex);
                  const isActive = videoIndex === props.activeVideo;

                  return (
                    <div
                      className={`w-full ${
                        isActive
                          ? 'bg-slate-200 dark:bg-slate-800'
                          : isLocked
                          ? 'opacity-50 cursor-not-allowed'
                          : 'cursor-pointer'
                      } transition-all p-2`}
                      key={item._id}
                      onClick={() => {
                        if (!props.isDemo && !isLocked) {
                          // props.setIsNextVideo(false);
                          props.setActiveVideo(videoIndex);
                        }
                      }}
                    >
                      <div className="flex items-start">
                        <MdOutlineOndemandVideo
                          size={25}
                          className="mr-2 mt-1"
                          color="#1cdada"
                        />
                        <h1 className="text-[18px] inline-block break-words text-black dark:text-white">
                          {item.title}
                        </h1>
                      </div>
                      <h5 className="pl-8 text-black dark:text-white">
                        {item.videoLength < 60
                          ? `${item.videoLength} minutes`
                          : `${(item.videoLength / 60).toFixed(2)} hours`}
                      </h5>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
