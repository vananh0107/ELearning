import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({ otp: '', playbackInfo: '' });
  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoUrl]);
  return (
    <div
      style={{ paddingTop: '56.25%', overflow: 'hidden', position: 'relative' }}
    >
      {videoData.otp && videoData.playbackInfo !== '' && (
        <iframe
          src={`https://player.vdocipher.com/v2?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=2t4J8zUn839edFbp`}
          style={{
            border: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="ecrypted-media"
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
