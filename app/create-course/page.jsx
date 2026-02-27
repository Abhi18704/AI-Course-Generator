"use client"
import React, { useContext, useEffect, useState } from 'react'
import { BiSolidCategory } from "react-icons/bi";
import { MdOutlineDescription } from "react-icons/md";
import { IoOptionsSharp } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import LoadingDialog from './_components/LoadingDialog';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
//import { GenerateCourseLayout_AI } from '@/configs/AiModel';
function CreateCourse() {
  const StepperOptions=[
    {
    id:1,
    name:'Category',
    icon:<BiSolidCategory />
    },
    {
    id:2,
    name:'Topic & Description',
    icon:<MdOutlineDescription />
    },
    {
    id:3,
    name:'Options',
    icon:<IoOptionsSharp />
    },

]
const [activeStep,setActiveStep]=useState(0);
const{userCourseInput,setUserCourseInput}=useContext(UserInputContext);
useEffect(()=>{
console.log(userCourseInput);
},[ userCourseInput])
/* checking the button status*/
const checkStatus=()=>{
  if(userCourseInput?.length==0)
  {
    return true;
  }
  else if(activeStep==0 &&(userCourseInput?.category?.length==0 || userCourseInput?.category==undefined))
  {
    return true;
  }
  if(activeStep==1 && (userCourseInput?.topic?.length==0 ||  userCourseInput?.topic==undefined))
  {
    return true;
  }
  else if(activeStep==2 && (userCourseInput?.difficulty==undefined || userCourseInput?.duration==undefined || userCourseInput?.video==undefined || userCourseInput?.chapters==undefined))
  {
    return true;
  }
  return false;
}
const [loading,setLoading]=useState(false);
const {user}=useUser();
const router=useRouter();
/*
const GenerateCourseLayout=async()=>{
  setLoading(true);
  const BASIC_PROMPT='Generate a Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration:'
  const USER_INPUT_PROMPT='Category: '+userCourseInput?.category+', Topic:'+userCourseInput?.topic+', Level: '+userCourseInput?.difficulty+', Duration: '+userCourseInput?.duration+' NoOf Chapters:'+userCourseInput?.chapters+', in JSON format.'
 const FINAL_PROMPT=BASIC_PROMPT+USER_INPUT_PROMPT;
 console.log(FINAL_PROMPT);
 const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
 console.log(result.response?.text());
 console.log(JSON.parse(result.response?.text() || {}));
  setLoading(false);
}
  */
 const GenerateCourseLayout = async () => {
  setLoading(true);

  // 1️⃣ Base prompt
  const BASIC_PROMPT =
    "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration:";

  // 2️⃣ User input prompt (THIS is what you see in console like image)
  const USER_INPUT_PROMPT =
    ` Category: ${userCourseInput?.category},` +
    ` Topic: ${userCourseInput?.topic},` +
    ` Description: ${userCourseInput?.description},` +
    ` Level: ${userCourseInput?.difficulty},` +
    ` Duration: ${userCourseInput?.duration},` +
    ` NoOf Chapters: ${userCourseInput?.chapters}, in JSON format.`;

  // 3️⃣ Final prompt
  const FINAL_PROMPT =
BASIC_PROMPT +
USER_INPUT_PROMPT +
`
Generate a complete structured course in JSON format.
================ JSON FORMAT =================
{
  "course": {
    "name": "",
    "description": "",
    "category": "",
    "topic": "",
    "level": "",
    "totalDuration": "",
    "numberOfChapters": 0,
    "chapters": [
      {
        "chapterNumber": 1,
        "name": "",
        "briefDescription": "",
        "duration": "",
      }
    ]
  }
}

================ RULES =================

- description must be 3-4 full educational sentences
- briefDescription must clearly summarize the chapter
- duration must be realistic (example: "15 minutes")
- keyTopics must contain 5-7 learning points
- numberOfChapters must match requested count
- chapters must progress from beginner → advanced
- Programming courses MUST include code fields
- Health/Creative MUST NOT include code fields
- Return ONLY valid JSON (no markdown, no comments, no explanation)

`;

  // ✅ SHOW IN CONSOLE (exactly like your screenshot)
  console.log(FINAL_PROMPT);

  const res = await fetch("/api/generate-course", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: FINAL_PROMPT,
    meta: {
      category: userCourseInput.category,
      topic: userCourseInput.topic,
      description: userCourseInput.description,
      level: userCourseInput.difficulty,
      duration: userCourseInput.duration,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl,
    },
  }),
});

const data = await res.json();

if (!data.success) {
  console.error("API Error:", data.error);
  return;
}
router.replace(`/create-course/${data.courseId}`);
const courseData = data.courseData;

console.log("GENERATED COURSE DATA:", courseData);

  setLoading(false);
  
};

// const SaveCourseLayoutInDb=async(courseLayout)=>{
//   var id=uuid4();
//   setLoading(true);
//   const result=await db.insert(CourseList).values({
//     courseId:id,
//     name:userCourseInput?.topic,
//     level:userCourseInput?.difficulty,
//     category:userCourseInput?.category,
//     duration:userCourseInput?.duration,
//     courseOutput:courseLayout,
//     createdBy:user?.primaryEmailAddress?.emailAddress || 'unknown',
//     userName:user?.fullName || 'Unknown User',
//     userProfileImage:user?.imageUrl || ''
//   })
//   console.log("finished");
//   setLoading(false);
// }



  return (
    <div>
      {/* stepper*/}
      <div className="flex flex-col justify-center items-center mt-10">
  <h2 className="text-4xl text-green-600 font-medium">
    Create AI Course
  </h2>

  <div className="flex mt-10">
    {StepperOptions.map((item, index) => (
      <div key={index} className="flex items-center">

        {/* Step icon */}
        <div className="flex flex-col items-center w-12 md:w-24">
          <div className={`bg-gray-200 p-3 rounded-full text-gray-700 ${activeStep>=index&& 'bg-green-500 text-white'}`}>
            {item.icon}
          </div>
          <h2 className="hidden md:block md:text-sm mt-2 whitespace-nowrap">
            {item.name}
          </h2>
        </div>

        {/* Line between steps */}
        {index !== StepperOptions.length - 1 && (
          <div className={`hidden md:block h-1 w-24 lg:w-40 rounded-full bg-gray-300 ${activeStep-1>=index&& 'bg-green-500'}`}></div>
        )}

      </div>
    ))}
  </div>
</div>

     <div className='px-10 md:px-20 lg:px-44 mt-10'>
      {/* component*/}
      {activeStep==0?<SelectCategory/>:
      activeStep==1?<TopicDescription/>:<SelectOption/>}
      {/* Next perivous Button */}
      <div className='flex justify-between mt-10'>
        <Button  className='cursor-pointer' disabled={activeStep===0} onClick={()=>setActiveStep(activeStep-1)}>Previous</Button>
        {activeStep<2&&<Button  className='cursor-pointer ' disabled={checkStatus()} onClick={()=>setActiveStep(activeStep+1)}>Next</Button>}
        {activeStep==2&&<Button className='cursor-pointer' disabled={checkStatus()}  onClick={()=>GenerateCourseLayout()}>Generate Course Layout</Button>}
      </div>
      </div>
      <LoadingDialog loading={loading}/>
    </div>
  )
}

export default CreateCourse