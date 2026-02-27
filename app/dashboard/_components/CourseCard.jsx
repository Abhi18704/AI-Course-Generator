import Image from "next/image";
import React from "react";
import { IoBookOutline, IoEllipsisVertical } from "react-icons/io5";
import DropDownOption from "./DropDownOption";
import Link from "next/link";

function CourseCard({ course, onDelete }) {

  const handleOnDelete = async () => {
    

    const res = await fetch("/api/delete-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: course.courseId,
      }),
    });

    const data = await res.json();

    if (data.success) {
      onDelete(course.courseId); // remove from UI
    } else {
      alert("Failed to delete course");
    }
  };

  return (
    <div className="shadow-md rounded-lg border p-2 cursor-pointer mt-4">
      <Link href={'/course/'+course?.courseId}>
      <Image
        src={course.imageUrl}
        alt="image"
        width={300}
        height={300}
        className="w-full object-cover h-200px rounded-lg"
      />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg flex items-center justify-between">
          {course.courseOutput?.course?.name}

          <DropDownOption handleOnDelete={handleOnDelete}>
            <IoEllipsisVertical />
          </DropDownOption>
        </h2>

        <p className="text-sm text-gray-400 my-1">
          {course.category}
        </p>

        <div className="flex items-center justify-between">
          <h2 className="flex gap-2 items-center p-1 bg-purple-50 text-blue-500 text-sm rounded-sm">
            <IoBookOutline />
            {course.courseOutput?.course?.numberOfChapters} Chapters
          </h2>

          <h2 className="text-sm bg-purple-50 p-1 rounded-sm text-blue-500">
            {course.courseOutput?.course?.level} Level
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
