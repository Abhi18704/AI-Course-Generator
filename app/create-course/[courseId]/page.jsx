// "use client";

// import { useUser } from "@clerk/nextjs";
// import React, { useEffect, useState } from "react";
// import { use } from "react";
// import CourseBasicInfo from "./_components/CourseBasicInfo";
// import CourseDetail from "./_components/CourseDetail";
// import ChapterList from "./_components/ChapterList";
// import { Button } from "@/components/ui/button";
// import LoadingDialog from "../_components/LoadingDialog";

// function CourseLayout({ params }) {
//   const { user } = useUser();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const { courseId } = use(params);

//   useEffect(() => {
//     if (!courseId || !user) return;
//     GetCourse();
//   }, [courseId, user]);

//   const GetCourse = async () => {
//     const res = await fetch("/api/get-course", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         courseId,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//       }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       setCourse(data.course);
//     }
//   };

//   // ================== GENERATE CONTENT ==================

//   const GenerateChapterContent = async () => {
//     if (!course) return;

//     setLoading(true);

//     const chapters = course.courseOutput.course.chapters;

//     const updatedChapters = [];

//     for (let chapter of chapters) {

//       const PROMPT = `
// Explain the concept in full detail for:

// Category: ${course.category}
// Course Topic: ${course.topic}
// Chapter Title: ${chapter.name}
// Level: ${course.level}

// Return JSON only:

// {
//   "chapter": {
//     "title": "",
//     "detailedExplanation": "",
//     "keyConcepts": [],
//     "stepByStepBreakdown": [],
//     "codeExample": "<pre><code>YOUR CODE HERE</code></pre>",
//     "codeExplanation": "",
//     "realWorldUseCases": [],
//     "quickSummary": ""
//   }
// }

// Rules:
// - detailedExplanation: 10–15 sentences
// - keyConcepts: 5–7 points
// - stepByStepBreakdown: beginner friendly
// - Programming → include code
// - Health/Creative → NO code
// - ONLY JSON
// `;

//       const res = await fetch("/api/generate-chapter", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: PROMPT }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         updatedChapters.push({
//           ...chapter,
//           chapterContent: data.chapterData.chapter,
//         });
//       }
//     }

//     // 🔥 update full course JSON
//     const updatedCourse = {
//       ...course.courseOutput,
//       course: {
//         ...course.courseOutput.course,
//         chapters: updatedChapters,
//       },
//     };

//     // 💾 save back to DB
//     await fetch("/api/update-course-content", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         courseId: course.courseId,
//         updatedCourse,
//       }),
//     });

//     await GetCourse();

//     setLoading(false);
//   };

//   if (!course) return null;

//   return (
//     <div className="mt-10 px-7 md:px-20 lg:px-44">
//       <h1 className="font-bold text-center text-2xl">Course Layout</h1>

//       <LoadingDialog loading={loading} />

//       <CourseBasicInfo course={course} refreshData={GetCourse} />
//       <CourseDetail course={course} />
//       <ChapterList course={course} refreshData={GetCourse} />

//       <Button
//         onClick={GenerateChapterContent}
//         className="my-10 w-full"
//       >
//         Generate Course Content
//       </Button>
//     </div>
//   );
// }

// export default CourseLayout;


// "use client";

// import { useUser } from "@clerk/nextjs";
// import React, { useEffect, useState } from "react";
// import { use } from "react";
// import CourseBasicInfo from "./_components/CourseBasicInfo";
// import CourseDetail from "./_components/CourseDetail";
// import ChapterList from "./_components/ChapterList";
// import { Button } from "@/components/ui/button";
// import LoadingDialog from "../_components/LoadingDialog";

// function CourseLayout({ params }) {
//   const { user } = useUser();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ unwrap params safely (Next 15+)
//   const { courseId } = use(params);

//   useEffect(() => {
//     if (!courseId || !user) return;
//     GetCourse();
//   }, [courseId, user]);

//   const GetCourse = async () => {
//     const res = await fetch("/api/get-course", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         courseId,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//       }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       setCourse(data.course);
//     }
//   };

//   // ================== GENERATE CONTENT ==================

//   const GenerateChapterContent = async () => {
//     if (!course?.courseOutput?.course?.chapters) return;

//     setLoading(true);

//     const chapters = course.courseOutput.course.chapters;
//     const updatedChapters = [];

//     for (const chapter of chapters) {

//       const PROMPT = `
// Explain the concept in full detail for:

// Category: ${course.category}
// Course Topic: ${course.topic}
// Chapter Title: ${chapter.name}
// Level: ${course.level}

// Return ONLY valid JSON:

// {
//   "chapter": {
//     "title": "",
//     "detailedExplanation": "",
//     "keyConcepts": [],
//     "stepByStepBreakdown": [],
//     "codeExample": "<pre><code>YOUR CODE HERE</code></pre>",
//     "codeExplanation": "",
//     "realWorldUseCases": [],
//     "quickSummary": ""
//   }
// }

// Rules:
// - detailedExplanation: 10–15 sentences
// - keyConcepts: 5–7 points
// - stepByStepBreakdown: beginner friendly
// - Programming → include code
// - Health/Creative → NO code
// - NO markdown
// - JSON ONLY
// `;

//       try {
//         const res = await fetch("/api/generate-chapter", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ prompt: PROMPT }),
//         });

//         const data = await res.json();

//         if (data.success) {
//           updatedChapters.push({
//             ...chapter,
//             chapterContent: data.chapterData.chapter,
//           });
//         } else {
//           console.error("Chapter failed:", data.error);
//         }

//         // ⏳ throttle AI requests (VERY IMPORTANT)
//         await new Promise(r => setTimeout(r, 1200));

//       } catch (err) {
//         console.error("Chapter error:", err);
//       }
//     }

//     // 🔥 rebuild course JSON safely
//     const updatedCourse = {
//       ...course.courseOutput,
//       course: {
//         ...course.courseOutput.course,
//         chapters: updatedChapters,
//       },
//     };

//     // 💾 save back to DB
//     await fetch("/api/update-course-content", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         courseId: course.courseId,
//         updatedCourse,
//       }),
//     });

//     await GetCourse();
//     setLoading(false);
//   };

//   if (!course) return null;

//   return (
//     <div className="mt-10 px-7 md:px-20 lg:px-44">
//       <h1 className="font-bold text-center text-2xl">Course Layout</h1>

//       <LoadingDialog loading={loading} />

//       <CourseBasicInfo course={course} refreshData={GetCourse} />
//       <CourseDetail course={course} />
//       <ChapterList course={course} refreshData={GetCourse} />

//       <Button
//         onClick={GenerateChapterContent}
//         className="my-10 w-full"
//       >
//         Generate Course Content
//       </Button>
//     </div>
//   );
// }

// export default CourseLayout;


// new 

"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState, use } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { Button } from "@/components/ui/button";
import LoadingDialog from "../_components/LoadingDialog";
import { useRouter } from "next/navigation";



function CourseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const router=useRouter();

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

  // ================== GENERATE CONTENT ==================

 const GenerateChapterContent = async () => {
  if (!course) return;

  setLoading(true);

  const chapters = course.courseOutput.course.chapters;

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];

    console.log(`🚀 Generating Chapter ${i + 1}: ${chapter.name}`);

    const PROMPT = `
Create JSON content for this chapter.

Topic: ${course.topic}
Chapter: ${chapter.name}
Level: ${course.level}

Return:

{
 "detailedExplanation":"",
 "keyConcepts":[],
 "stepByStepBreakdown":[],
 "codeExample":"",
 "codeExplanation":"",
 "realWorldUseCases":[],
 "quickSummary":""
}

Rules:
- explanation 6–8 sentences
- 4–6 keyConcepts
- simple steps
- include code only if programming
- JSON only
`;

    try {
      // 🧠 Generate AI content
      const aiRes = await fetch("/api/generate-chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: PROMPT }),
      });

      const aiData = await aiRes.json();
      if (!aiData.success) continue;

      const content = aiData.chapterData;

      // 💾 Save chapter + auto fetch video (backend)
      await fetch("/api/save-chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course.courseId,
          chapterId: i + 1,
          content,
          chapterName: chapter.name,
          topic: course.topic,
        }),
      });

      console.log(`✅ Saved chapter ${i + 1}`);

    } catch (err) {
      console.error("❌ Chapter failed:", err);
    }

    await new Promise(r => setTimeout(r, 1500));
  }
  // ✅ Mark course as published
await fetch("/api/publish-course", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    courseId: course.courseId
  }),
});


  setLoading(false);

  router.replace(`/create-course/${course.courseId}/finish`);

};



  if (!course) return null;

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h1 className="font-bold text-center text-2xl">Course Layout</h1>

      <LoadingDialog loading={loading} />

      <CourseBasicInfo course={course} refreshData={GetCourse} />
      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={GetCourse} />

      <Button
        onClick={GenerateChapterContent}
        className="my-10 w-full"
      >
        Generate Course Content
      </Button>
    </div>
  );
}

export default CourseLayout;

