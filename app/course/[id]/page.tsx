'use client';
import { useSearchParams } from 'next/navigation';
import CourseDetailsPage from '../../components/Course/CourseDetailsPage';
import { useRouter } from 'next/navigation';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';

const Page = ({ params }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: userData } = useLoadUserQuery(undefined, {});
  if (searchParams?.size) {
    router.push(`/course/${params.id}`);
  }
  return (
    <div className="dark:bg-opacity-50 dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black box-border ">
      <CourseDetailsPage id={params.id} userData={userData}/>
    </div>
  );
};
export default Page;
