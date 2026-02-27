import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

function TopicDescription() {
  const{userCourseInput,setUserCourseInput}=useContext(UserInputContext);
  const handleInputChange=(fieldName,value)=>{
    // Handle input change and update state
    setUserCourseInput(prev=>({
      ...prev,
      [fieldName]:value
    }))
  }
  return (
    <div className='mx-20 lg:mx-44'>
      {/* Input topic */}
      <div className='mt-5'>
        <label> 💡write the topic for which you want to generate an AI course (e.g., python course,Yoga,etc.):</label>
        <Input className='mt-3' placeholder={'Topic'} defaultValue={userCourseInput?.topic} onChange={(e)=>handleInputChange('topic',e.target.value)}/>
      </div>
      <div className='mt-5'>
        <label>💡Describe the course you want to generate:</label>
        <Textarea className='mt-3' placeholder='Description' defaultValue={userCourseInput?.description} onChange={(e)=>handleInputChange('description',e.target.value)}/>
      </div>
      {/* description  */}
    </div>
  )
}

export default TopicDescription