import React, { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { AiOutlineCamera } from 'react-icons/ai';
import avatarIcon from '../../../public/assets/avatar.jpg';
import { styles } from '@/app/styles/style';
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: updateError }] =
    useEditProfileMutation();

  const { data, refetch, isLoading } = useLoadUserQuery(undefined);

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        await updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      refetch();
      toast.success('Profile updated successfully');
    }
    if (error || updateError) {
      console.log(error);
    }
  }, [isSuccess, error, success, updateError, refetch]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== '') {
      await editProfile({ name: name });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              user?.avatar || avatar ? user?.avatar.url || avatar : avatarIcon
            }
            width={120}
            height={120}
            alt="Profile Avatar"
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} fill="#fff" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2 dark:text-white">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2 dark:text-white">
                Email Address
              </label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                readOnly
                value={user?.email}
                required
              />
            </div>
            <input
              type="submit"
              className="w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer"
              required
              value="Update"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
