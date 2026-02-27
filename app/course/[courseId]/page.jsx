"use client";

import React, { useEffect, useState, use } from "react";
import { useUser } from "@clerk/nextjs";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import Header from "@/app/_components/Header";
import CourseDetail from "@/app/create-course/[courseId]/_components/CourseDetail";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";

function Course({ params }) {
  const { user } = useUser();

  const { courseId } = use(params);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId || !user) return;
    GetCourse();
  }, [courseId, user]);

  const GetCourse = async () => {
    try {
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
    } catch (err) {
      console.error("GET COURSE ERROR:", err);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center mt-20 text-red-500">
        Course not found.
      </div>
    );
  }

  return (
    <div>
      <Header/>
      <div className="px-10 p-10 md:px-20 lg:px-44">
      <CourseBasicInfo course={course} edit={false}/>
      <CourseDetail course={course}/>
      <ChapterList course={course} edit={false}/>
      </div>
    </div>
  );
}

export default Course;
