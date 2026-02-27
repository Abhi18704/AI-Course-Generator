import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FiEdit } from "react-icons/fi";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialogFooter } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
function EditChapters({course,index,refreshData}) {
const Chapters=course?.courseOutput?.course?.chapters;
const [name,setName]=useState();
const [about,setAbout]=useState();
useEffect(()=>{
    setName(Chapters[index].name);
    setAbout(Chapters[index].briefDescription);
},[course])
const onUpdateHandler = async () => {
  Chapters[index].name = name;
  Chapters[index].briefDescription = about;
  await fetch("/api/get-course", {
    method: "POST",
    headers: { "Content-Type": "application/json" },  
    body: JSON.stringify({
      courseId: course.courseId,
      updatedCourseOutput: course.courseOutput,
    }),
  });
refreshData(true);
}
  return (
   <Dialog>
  <DialogTrigger><FiEdit /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Chapter</DialogTitle>
      <DialogDescription>
       <div className='mt-3'>
          <label className='font-medium'>Course Title</label>
          <Input defaultValue={Chapters[index].name} onChange={(event)=>setName(event?.target.value)}/>
        </div>
        <div>
          <label className='font-medium'>Course Description</label>
          <Textarea defaultValue={Chapters[index].briefDescription} onChange={(event)=>setAbout(event?.target.value)}/>
        </div>
      </DialogDescription>
    </DialogHeader>
    <AlertDialogFooter>
      <DialogClose>
        <Button onClick={onUpdateHandler}>Update</Button>
      </DialogClose>
    </AlertDialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default EditChapters