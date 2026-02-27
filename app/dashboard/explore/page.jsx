"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CourseCard from "@/app/dashboard/_components/CourseCard";

function Explore() {
  const { user } = useUser();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (!user) return;
    loadCourses();
  }, [user]);

  const loadCourses = async () => {
    try {
      const res = await fetch("/api/get-user-courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user?.primaryEmailAddress?.emailAddress
        })
      });

      const data = await res.json();

      if (data.success) {
        setCourses(data.courses.filter(c => c.publish === true));
      }
    } catch (err) {
      console.error("EXPLORE ERROR:", err);
    }

    setLoading(false);
  };

  const filteredCourses = courses.filter(course => {
    const matchSearch =
      course.name?.toLowerCase().includes(search.toLowerCase()) ||
      course.topic?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" || course.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <div className="px-10 py-8 space-y-6">

      <h1 className="text-3xl font-bold">Explore Courses 🚀</h1>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">

        <input
          placeholder="Search by course or topic..."
          className="border px-4 py-2 rounded-lg w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Programming</option>
          <option>Health</option>
          <option>Creative</option>
        </select>

      </div>

      {/* Courses */}
      {loading ? (
        <p className="text-gray-500">Loading courses...</p>
      ) : filteredCourses.length === 0 ? (
        <p className="text-gray-400">No courses found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.courseId} course={course} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Explore;
