import React, { FC, useEffect, useState } from 'react';
import { styles } from '@/app/styles/style';
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';
import ShowHideEye from '@/app/components/Common/ShowHideEye';
type Props = {};

const ChangePassword: FC<Props> = (props: Props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (oldPassword !== newPassword) {
      toast.error('Passwords do not match');
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password changed successfully');
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <>
      <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
        <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
          Change Password
        </h1>
      </div>

      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-[100%] 800px:w-[60%] mt-5 relative">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter your old password
            </label>
            <input
              type={!showOldPassword ? 'password' : 'text'}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <ShowHideEye
              className="absolute bottom-[10px] right-[60px]"
              show={showOldPassword}
              setShow={setShowOldPassword}
            />
          </div>

          <div className="w-[100%] 800px:w-[60%] mt-2 relative">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter your new password
            </label>
            <input
              type={!showNewPassword ? 'password' : 'text'}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <ShowHideEye
              className="absolute bottom-[10px] right-[60px]"
              show={showNewPassword}
              setShow={setShowNewPassword}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2 relative">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter your confirm password
            </label>
            <input
              type={!showConfirmPassword ? 'password' : 'text'}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <ShowHideEye
              className="absolute top-[52px] right-[60px]"
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
            />
            <input
              type="submit"
              value="Update"
              className={`w-[95%] h-[40px] border border-[#37a39a] text-center text-black dark:text-[#fff] rounded-[3px] mt-8 cursor-pointer`}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
