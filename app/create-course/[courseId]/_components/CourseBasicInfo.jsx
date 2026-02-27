import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoExtensionPuzzle } from "react-icons/io5";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import Link from "next/link";

function CourseBasicInfo({ course, refreshData,edit=true }) {
  const [preview, setPreview] = useState(
  course?.imageUrl || "/placeholder.jpg"
);

useEffect(() => {
  if (course?.imageUrl) {
    setPreview(course.imageUrl);
  }
}, [course]);
  const [loading, setLoading] = useState(false);

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // preview instantly
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      // 🔥 save image URL in DB
      await fetch("/api/update-course-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.courseId,
          imageUrl: data.imageUrl,
        }),
      });

      refreshData(true);
    }

    setLoading(false);
  };

  return (
    <div className="p-10 border rounded-xl shadow-md mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-2xl">
            {course?.courseOutput?.course?.name}
            {edit &&<EditCourseBasicInfo
              course={course}
              refreshData={() => refreshData(true)}
            />}
          </h2>

          <p className="text-sm text-gray-500 mt-3">
            {course?.courseOutput?.course?.description}
          </p>

          <h2 className="font-medium mt-2 flex gap-2 items-center text-blue-800">
            <IoExtensionPuzzle />
            {course?.category}
          </h2>
          {!edit&&<Link href={'/course/'+course?.courseId+'/start'}>
          <Button className="w-full mt-5 cursor-pointer">Start</Button>
          </Link>}
        </div>

        <div>
          <label htmlFor="upload-image" className="cursor-pointer">
            <Image
              src={preview}
              alt="course image"
              width={300}
              height={300}
              className="w-full rounded-xl h-64 object-cover"
            />
          </label>

          {edit&&<input
            type="file"
            id="upload-image"
            className="hidden"
            accept="image/*"
            onChange={onFileSelected}
          />}

          {loading && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              Uploading image...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
