import React from 'react'
import { SlClock } from "react-icons/sl";
import { RiCheckboxCircleLine } from "react-icons/ri";
import EditChapters from './EditChapters';
function ChapterList({course,refreshData,edit=true}) {
  return (
    <div className='mt-3'>
         <h2 className='font-medium text-xl'>Chapters</h2>
         <div className='mt-2'>
          {course.courseOutput?.course?.chapters?.map((chapter, index) => (
  <div
    key={chapter.chapterNumber || index}
    className="border p-5 rounded-lg mb-2 flex justify-between items-center"
  >
    <div className="flex gap-5 items-center">
      <h2 className="h-10 w-10 rounded-full bg-blue-500 flex-none text-white flex items-center justify-center font-semibold">
        {index + 1}
      </h2>

      <div>
        <h2 className="font-medium text-lg">{chapter.name}{edit&&<EditChapters course={course} index={index} refreshData={()=>refreshData(true)}/>}</h2>
        <p className="text-sm text-gray-600">{chapter.briefDescription}</p>
        <p className="flex gap-2 text-blue-500 items-center">
          <SlClock /> {chapter.duration}
        </p>
      </div>
    </div>

    <RiCheckboxCircleLine className="text-3xl text-gray-400 flex-none" />
  </div>
))}

         </div>
    </div>
  )
}

export default ChapterList