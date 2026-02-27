import React from 'react'
import { HiMiniChartBar } from "react-icons/hi2";
import { FaRegClock } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { TbBrandYoutube } from "react-icons/tb";
function CourseDetail({course}) {
  return (
    <div className='border p-6 rounded-xl shadow-md mt-3'>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
           <div className='flex gap-2 '>
              <HiMiniChartBar className='text-3xl text-blue-600' />
              <div>
                <h2 className='text-3xs text-gray-500'>Skill level</h2>
                <h2 className='font-medium text-lg'>{course?.level}</h2>
              </div>
           </div>

           <div className='flex gap-2 '>
              <FaRegClock className='text-3xl text-blue-600' />
              <div>
                <h2 className='text-xs text-gray-500'>Duration</h2>
                <h2 className='font-medium text-lg'>{course?.courseOutput?.course?.totalDuration}</h2>
              </div>
           </div>

           <div className='flex gap-2 '>
              <GoBook className='text-3xl text-blue-600' />
              <div>
                <h2 className='text-xs text-gray-500'>No Of chapters</h2>
                <h2 className='font-medium text-lg'>{course?.courseOutput?.course?.numberOfChapters}</h2>
              </div>
           </div>

           <div className='flex gap-2 '>
              <TbBrandYoutube className='text-3xl text-blue-600' />
              <div>
                <h2 className='text-xs text-gray-500'>Video Include</h2>
                <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
              </div>
           </div>
      </div>
    </div>
  )
}

export default CourseDetail