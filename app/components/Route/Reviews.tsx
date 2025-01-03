import { styles } from '@/app/styles/style';
import Image from 'next/image';
import React from 'react';
import banner_2 from '@/public/assets/business.webp';
import ReviewCard from '../Review/ReviewCard';
type Props = {};
export const reviews = [
  {
    name: 'Gene Bates',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    profession: 'Student | Cambridge university',
    comment:
      "I had the pleasure of exploring Becodemy, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out Becodemy!",
  },
  {
    name: 'Jay Gibbs',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    profession: 'Computer systems engineering student | Zimbabwe',
    comment:
      'Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!',
  },
  {
    name: 'Verna Santos',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    profession: 'Full stack developer | Quarter Ltd.',
    comment:
      "Your programming tutorials are truly remarkable! The way you explain challenging concepts with clarity and structure is incredibly effective. I appreciate how you cover a wide range of topics and programming languages, making learning accessible for everyone. The real-world examples and hands-on approach not only simplify the material but also make it engaging and relevant. It's evident that you care deeply about fostering a positive learning experience for your audience. Thank you for your hard work and for inspiring so many aspiring programmers",
  },

  {
    name: 'Mina Davidson',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    profession: 'Junior Web Developer | Andorra',
    comment:
      'I had the pleasure of exploring Becodemy, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience.',
  },
  {
    name: 'Rosemary Smith',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    profession: 'Full stack web developer | Algeria',
    comment:
      "Your content is very special. The thing I liked the most is that the videos are so long, which means they cover everything in detail. For that any person had beginner-level can complete an integrated project when he watches the videos. Thank you very much. I'm very excited for the next videos. Keep doing this amazing work!",
  },
  {
    name: 'Laura Mckenzie',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    profession: 'Junior BRSE | Mckenzie',
    comment:
      'Join Becodemy! Becodemy focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend Becodemy to anyone looking to improve their programming skills and build practical projects. Becodemy is a great platform to take your skills to the next level.',
  },
];
const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center  my-[60px]">
        <div className="800px-[50%] w-full">
          <Image src={banner_2} alt="" width={700} height={700} />
        </div>
        <div className="800px:w-[67%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are
            <br /> <span className="text-gradient">
              Our Strength
            </span> <br /> See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            Our students are the foundation of everything we do. Their stories
            of growth, success, and resilience inspire us daily. From academic
            achievements to personal milestones, they continue to showcase the
            strength and dedication that define our community. Here’s what they
            have to say about their journey with us.
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-50px]">
        {reviews &&
          reviews.map((i, index) => (
            <ReviewCard item={i} key={index} index={index} />
          ))}
      </div>
    </div>
  );
};

export default Reviews;
