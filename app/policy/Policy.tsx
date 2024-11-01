import React from 'react';
import { styles } from '../styles/style';

type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div
        className={`w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3`}
      >
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Conditions
        </h1>
        <ul style={{ listStyle: 'unset', marginLeft: '15px' }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Welcome to our platform. By accessing or using our services, you are
            agreeing to the following terms and conditions. Please read these
            terms carefully, as they outline your rights, responsibilities, and
            the legal agreement between you and our platform.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>Account Registration:</strong> You must create an account to
            access most of our services. When registering, please ensure all
            information provided is accurate, complete, and kept up to date. You
            are responsible for maintaining the security of your account
            credentials, and you agree to notify us immediately if you suspect
            any unauthorized use of your account. We reserve the right to
            terminate accounts for any violations of our policies.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>Intellectual Property Rights:</strong> All course content,
            including videos, articles, quizzes, and supplemental materials, are
            the intellectual property of our platform or our content creators.
            Unauthorized reproduction, distribution, or modification of course
            content is strictly prohibited. You are granted a limited,
            non-exclusive, non-transferable license to access and view the
            content solely for personal, non-commercial, educational purposes.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>User Conduct and Responsibilities:</strong> You agree to use
            our platform in a manner that is lawful and respectful to others.
            You must not engage in any behavior that could harm, disable, or
            negatively impact other users' experiences. This includes refraining
            from harassment, spamming, or uploading harmful or offensive
            materials. Violating these guidelines may result in the suspension
            or termination of your account.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>Content Usage and Access:</strong> Access to purchased or
            enrolled courses is provided solely for your personal,
            non-commercial use. Sharing your account access with others or
            distributing any part of the course content publicly is not
            permitted. You acknowledge that all rights, titles, and interests in
            course materials remain with our platform and the respective
            instructors.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>Payment, Refunds, and Cancellations:</strong> Payments for
            courses or subscriptions are processed securely. You agree to
            provide accurate and complete payment information. Refund requests
            must adhere to our refund policy, which may allow cancellations
            within a certain period after purchase. Refund eligibility and the
            processing timeline may vary depending on the course or subscription
            plan.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <strong>Payment, Refunds, and Cancellations:</strong> Payments for
            courses or subscriptions are processed securely. You agree to
            provide accurate and complete payment information. Refund requests
            must adhere to our refund policy, which may allow cancellations
            within a certain period after purchase. Refund eligibility and the
            processing timeline may vary depending on the course or subscription
            plan.
          </p>
          <br />
        </ul>
      </div>
    </div>
  );
};

export default Policy;
