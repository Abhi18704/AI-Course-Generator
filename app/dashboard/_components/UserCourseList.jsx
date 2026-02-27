"use client";

import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function UserCourseList() {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
 const {userCourseList,setuserCourseList}=useContext(UserCourseListContext);
 const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) getUserCourses();
  }, [user]);

  const getUserCourses = async () => {
    setLoading(true);
    const res = await fetch("/api/get-user-courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.primaryEmailAddress.emailAddress,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setCourses(data.courses);
      setuserCourseList(data.courses);
      console.log(data.courses);
    }
    setLoading(false);
  };
  const handleDelete = (courseId) => {
  setCourses(prev => prev.filter(c => c.courseId !== courseId));
};


  return (
    <div className="mt-10">
  <h2 className="font-bold text-xl">My AI Courses</h2>

  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">

  {loading ? (
    Array.from({ length: 6 }).map((_, index) => (
      <div
        key={index}
        className="w-full bg-slate-200 animate-pulse rounded-lg h-48"
      />
    ))
  ) : courses.length === 0 ? (
    <p className="text-gray-500 col-span-full">
      No courses found.
    </p>
  ) : (
    courses.map((course, index) => (
      <CourseCard
        key={course.courseId || index}
        course={course}
        onDelete={handleDelete}
      />
    ))
  )}

</div>
</div>
  )
}

export default UserCourseList;
