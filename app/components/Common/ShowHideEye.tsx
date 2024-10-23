import React from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const ShowHideEye = ({ className, show, setShow }) => {
  return (
    <div className={className}>
      {!show ? (
        <AiOutlineEyeInvisible
          className="z-1 cursor-pointer dark:text-white"
          size={20}
          onClick={() => setShow(true)}
        />
      ) : (
        <AiOutlineEye
          className="z-1 cursor-pointer dark:text-white"
          size={20}
          onClick={() => setShow(false)}
        />
      )}
    </div>
  );
};

export default ShowHideEye;
