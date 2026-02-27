"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { FaRegCopy } from "react-icons/fa";

function FinishScreen({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const router = useRouter();

  const { courseId } = use(params);

  useEffect(() => {
    if (!courseId || !user) return;
    GetCourse();
  }, [courseId, user]);

  const GetCourse = async () => {
    const res = await fetch("/api/get-course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setCourse(data.course);
    }
  };

  if (!course) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading course...
      </div>
    );
  }

  const courseUrl = `${window.location.origin}/course/${course.courseId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(courseUrl);
    alert("Course URL copied!");
  };

  return (
    <div className="px-6 md:px-20 lg:px-40 mt-10 space-y-8">

      {/* Course Info Card */}
      <CourseBasicInfo 
        course={course} 
        refreshData={GetCourse} 
      />
      {/* <div className="flex justify-end">
    <button
      onClick={() => router.push(courseUrl)}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
    >
      ▶ Start Course
    </button>
  </div> */}

      {/* Success Message */}
      <div className="bg-green-100 font-bold text-xl text-green-700 p-4 rounded-lg text-center shadow-sm">
        🎉 Course generated successfully! Your content is ready.
      </div>

      {/* Course URL Section */}
      <div className="space-y-2">
        <h2 className="font-semibold text-lg">Course URL:</h2>

        <div className="flex items-center justify-between border rounded-xl p-3 bg-gray-50">
          <span className="text-gray-600 break-all">
            {courseUrl}
          </span>

          <FaRegCopy 
            className="h-5 w-5 cursor-pointer text-gray-700 hover:text-black"
            onClick={handleCopy}
          />
        </div>
      </div>

    </div>
  );
}

export default FinishScreen;
