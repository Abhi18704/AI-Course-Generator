import { UserInputContext } from '@/app/_context/UserInputContext';
import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image'
import React, { useContext } from 'react'

function SelectCategory() {
  const{userCourseInput,setUserCourseInput}=useContext(UserInputContext);
  const handleCategoryChange=(category)=>{
    setUserCourseInput(prev=>({
      ...prev,
      category:category
    }))
  }
  return (
    <div className='px-10 md:px-20'>
      <h2 className="text-2xl font-bold my-5">Select the course Category</h2>
   <div className="grid grid-cols-3 gap-10 ">
  {CategoryList.map((item, index) => (
    <div
      key={index}
      className={`flex flex-col p-5 border items-center rounded-xl 
                 hover:border-green-500 hover:bg-blue-50 cursor-pointer transition ${userCourseInput?.category==item.name &&'border-green-500 bg-blue-50'}`}
                 onClick={()=>handleCategoryChange(item.name)}
    >
      {/* Image container */}
      <div className="w-full h-32 relative">
        <Image
          src={item.icon}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>

      <h2 className="mt-3 font-medium">{item.name}</h2>
    </div>
  ))}
</div>
</div>


  )
}

export default SelectCategory