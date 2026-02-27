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
function EditCourseBasicInfo({course,refreshData}) {
  const [name,setName]=useState();
  const [description,setDescription]=useState();
  useEffect(()=>{
     setName(course?.courseOutput?.course?.name);
     setDescription(course?.courseOutput?.course?.description);
  },[course])

  const onUpdateHandler = async () => {
  course.courseOutput.course.name = name;
  course.courseOutput.course.description = description;

  await fetch("/api/get-course", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      courseId: course.courseId,
      updatedCourseOutput: course.courseOutput,
    }),
  });
  refreshData(true);
};

  return (
    <Dialog>
  <DialogTrigger><FiEdit /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Course Title & Description</DialogTitle>
      <DialogDescription>
        <div className='mt-3'>
          <label className='font-medium'>Course Title</label>
          <Input defaultValue={course?.courseOutput?.course?.name} onChange={(event)=>setName(event?.target.value)}/>
        </div>
        <div>
          <label className='font-medium'>Course Description</label>
          <Textarea defaultValue={course?.courseOutput?.course?.description} onChange={(event)=>setDescription(event?.target.value)}/>
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

export default EditCourseBasicInfo