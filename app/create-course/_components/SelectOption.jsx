import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectOption() {
  const{userCourseInput,setUserCourseInput}=useContext(UserInputContext);
    const handleInputChange=(fieldName,value)=>{
      // Handle input change and update state
      setUserCourseInput(prev=>({
        ...prev,
        [fieldName]:value
      }))
    }
  return (
    <div className="px-6 md:px-20 lg:px-44 mt-10">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Difficulty Select */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
           🎓 Difficulty Level
          </label>

          <Select onValueChange={(value)=>handleInputChange('difficulty',value)} defaultValue={userCourseInput?.difficulty || ''}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select difficulty"/>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            🕓 Course Duration
          </label>

          <Select onValueChange={(value)=>handleInputChange('duration',value)} defaultValue={userCourseInput?.duration || ''}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Duration"/>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="1 Hour">1 Hour</SelectItem>
                <SelectItem value="2 Hours">2 Hours</SelectItem>
                <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
           ▶️ Add Video
          </label>

          <Select onValueChange={(value)=>handleInputChange('video',value)} defaultValue={userCourseInput?.video || ''}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select"/>
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="Yes">yes</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
           📖 Number of Chapters
          </label>
             <Input type="number" placeholder="Enter number of chapters" defaultValue={userCourseInput?.chapters || ''} onChange={(event)=>handleInputChange('chapters',event.target.value)} />
        </div>

      </div>
    </div>
  );
}

export default SelectOption;
