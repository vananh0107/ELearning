'use client'
import CourseDetailsPage from '../../components/Course/CourseDetailsPage'
const Page=({params}:any)=>{
  return(
    <div className='dark:bg-opacity-50 dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black'>
      <CourseDetailsPage id={params.id}/>
    </div>
  )
}
export default Page;