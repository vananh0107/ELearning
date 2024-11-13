import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery('Categories', {});
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (data) {
      setCategories(data?.layout.categories);
    }
  }, [data]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.file?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(courseInfo.thumbnail);
  return (
    <div className="w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit}>
        <div>
          <label className={`${styles.label}`}>Course Name</label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            id="name"
            placeholder="Learn React for Beginners"
            className={`${styles.input}`}
            onChange={(e: any) => {
              setCourseInfo({ ...courseInfo, name: e.target.value });
            }}
          />
        </div>
        <br />
        <div
          className="mb-5
        "
        >
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write something amazing ..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Price</label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              id="price"
              placeholder="$$$"
              className={`${styles.input}`}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, price: e.target.value });
              }}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.estimatedPrice}
              id="price"
              placeholder="$$$"
              className={`${styles.input}`}
              onChange={(e: any) => {
                setCourseInfo({
                  ...courseInfo,
                  estimatedPrice: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Tags</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.tags}
              id="tags"
              placeholder="Reactjs, Next 13, Socket io, Tailwind CSS, LMS"
              className={`${styles.input}`}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, tags: e.target.value });
              }}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>
              Course Categories
            </label>
            <select
              name=""
              id=""
              className={`${styles.input} dark:bg-black`}
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories?.map((item: any) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Level</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.level}
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
              onChange={(e: any) => {
                setCourseInfo({ ...courseInfo, level: e.target.value });
              }}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label}`}>Demo URL</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              id="demoUrl"
              placeholder="eer74fd"
              className={`${styles.input}`}
              onChange={(e: any) => {
                setCourseInfo({
                  ...courseInfo,
                  demoUrl: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <br />
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white text-black dark:text-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? 'bg-blue-500' : 'bg-transparent'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={
                  courseInfo.thumbnail.url
                    ? courseInfo.thumbnail.url
                    : courseInfo.thumbnail
                }
                alt=""
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop an image here or click to select a file.
              </span>
            )}
          </label>
        </div>
        <br />
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
