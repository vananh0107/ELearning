import { styles } from '@/app/styles/style';
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from '@/redux/features/layout/layoutApi';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Loader from '../../Loader/Loader';

type Props = {};

const EditCategories = (props: Props) => {

  const { data, isLoading, refetch } = useGetHeroDataQuery('Categories', {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  const [categories, setCategories] = useState<any[]>([]);

  const layoutSuccessRef = useRef(false);
  
  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess && !layoutSuccessRef.current) {
      refetch();
      toast.success('Categories updated successfully!');
      layoutSuccessRef.current = true;
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data, layoutSuccess, error]);

  useEffect(() => {
    if (!layoutSuccess) layoutSuccessRef.current = false;
  }, [layoutSuccess])

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategories: any) =>
      prevCategories.map((i: any) =>
        i._id === id ? { ...i, title: value } : i
      )
    );
  };
  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === '') {
      toast.error('Category title cannot be empty!');
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: '' }]);
    }
  };
  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((category: any) => category.title === '');
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: 'Categories',
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120p] text-center">
          <h1 className={`${styles.title}  mb-5`}>All Categories</h1>
          {categories &&
            categories.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px] text-xl dark:text-white`}
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      placeholder="Enter category title..."
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory: any) =>
                          prevCategory.filter((i: any) => i._id !== item._id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? '!cursor-not-allowed'
                : '!cursor-pointer !bg-[#42d383]'
            } !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data.layout.categories, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
