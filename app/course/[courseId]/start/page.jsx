// "use client";

// import React, { useEffect, useState, use } from "react";
// import { useUser } from "@clerk/nextjs";
// import ChapterListCard from "./_components/ChapterListCard";
// import ChapterContent from "./_components/ChapterContent";

// function CourseStart({ params }) {

//   const { user } = useUser();
  
//     const { courseId } = use(params);
  
//     const [course, setCourse] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [selectedChapter,setselectedChapter]=useState();
//     const [activeChapter, setActiveChapter] = useState();

  
//     useEffect(() => {
//       if (!courseId || !user) return;
//       GetCourse();
//     }, [courseId, user]);
  
//     const GetCourse = async () => {
//       try {
//         const res = await fetch("/api/get-course", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             courseId,
//             userEmail: user?.primaryEmailAddress?.emailAddress,
//           }),
//         });
  
//         const data = await res.json();
  
//         if (data.success) {
//           setCourse(data.course);
//           console.log(data.course)
//         }
//       } catch (err) {
//         console.error("GET COURSE ERROR:", err);
//       }
  
//       setLoading(false);
//     };
  
//     if (loading) {
//       return (
//         <div className="text-center mt-20 text-gray-500">
//           Loading course...
//         </div>
//       );
//     }
  
//     if (!course) {
//       return (
//         <div className="text-center mt-20 text-red-500">
//           Course not found.
//         </div>
//       );
//     }
// const GetSelectedChapterContent = async (chapterIndex) => {
//   try {
//     const res = await fetch("/api/get-chapter-content", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         courseId,
//         chapterId: chapterIndex + 1
//       }),
//     });

//     const data = await res.json();

//     if (data.success) {
//       console.log("Loaded chapter:", data.chapter);
//       setActiveChapter(data.chapter); // 👈 THIS displays it
//     }

//   } catch (err) {
//     console.error(err);
//   }
// };

//   return (
//     <div>
//       {/*Chapter list side bar*/}
//       <div className="fixed md:w-64 hidden md:block h-screen border-r shadow-md">
//           <h2 className="font-medium text-lg bg-indigo-500 p-4 text-white">{course?.courseOutput?.course?.name}</h2>
//           <div>
//             {course?.courseOutput?.course?.chapters.map((chapter,index)=>(
//               <div key={index} className={`cursor-pointer hover:bg-purple-50 ${selectedChapter?.name==chapter?.name&&'bg-purple-200'}`} onClick={()=>{setselectedChapter(chapter); GetSelectedChapterContent(index)}}>
//                  <ChapterListCard chapter={chapter} index={index}/>
//                 </div>
//             ))}
//           </div>
//         </div>
//         {/*Chapter Div*/}
//         <div className="md:ml-64">
//            <ChapterContent chapter={selectedChapter} content={chapterContent}/>
//         </div>
//     </div>
//   );
// }

// export default CourseStart;
// "use client";

// import React, { useEffect, useState, use } from "react";
// import { useUser } from "@clerk/nextjs";
// import ChapterListCard from "./_components/ChapterListCard";
// import ChapterContent from "./_components/ChapterContent";

// function CourseStart({ params }) {
//   const { user } = useUser();
//   const { courseId } = use(params);

//   const [course, setCourse] = useState();
//   const [loading, setLoading] = useState(true);
//   const [activeChapter, setActiveChapter] = useState();

//   useEffect(() => {
//     if (!courseId || !user) return;
//     GetCourse();
//   }, [courseId, user]);

//   const GetCourse = async () => {
//     try {
//       const res = await fetch("/api/get-course", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           courseId,
//           userEmail: user?.primaryEmailAddress?.emailAddress,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setCourse(data.course);
//       }
//     } catch (err) {
//       console.error("GET COURSE ERROR:", err);
//     }

//     setLoading(false);
//   };

//   const GetSelectedChapterContent = async (chapterIndex) => {
//     try {
//       const res = await fetch("/api/get-chapter-content", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           courseId,
//           chapterId: chapterIndex + 1,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         setActiveChapter(data.chapter); // ✅ main fix
//       }
//     } catch (err) {
//       console.error("CHAPTER FETCH ERROR:", err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-20 text-gray-500">
//         Loading course...
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="text-center mt-20 text-red-500">
//         Course not found.
//       </div>
//     );
//   }

//   return (
//     <div>

//       {/* Sidebar */}
//       <div className="fixed md:w-64 hidden md:block h-screen border-r shadow-md overflow-y-auto">
//         <h2 className="font-medium text-lg bg-indigo-500 p-4 text-white">
//           {course?.courseOutput?.course?.name}
//         </h2>

//         {course?.courseOutput?.course?.chapters.map((chapter, index) => (
//           <div
//             key={index}
//             onClick={() => GetSelectedChapterContent(index)}
//             className={`cursor-pointer hover:bg-purple-50
//               ${activeChapter?.chapterId === index + 1 ? "bg-purple-200" : ""}
//             `}
//           >
//             <ChapterListCard chapter={chapter} index={index} />
//           </div>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="md:ml-64">
//         <ChapterContent chapter={activeChapter} />
//       </div>
//     </div>
//   );
// }

// export default CourseStart;

"use client";

import React, { useEffect, useState, use } from "react";
import { useUser } from "@clerk/nextjs";
import ChapterListCard from "./_components/ChapterListCard";
import ChapterContent from "./_components/ChapterContent";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


function CourseStart({ params }) {
  const { user } = useUser();
  const { courseId } = use(params);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedOutline, setSelectedOutline] = useState(null); // title + desc
  const [activeChapter, setActiveChapter] = useState(null);     // DB content
  const router = useRouter();


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

  const GetSelectedChapterContent = async (chapterIndex, chapterOutline) => {
    try {
      setSelectedOutline(chapterOutline);

      const res = await fetch("/api/get-chapter-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          chapterId: chapterIndex + 1,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setActiveChapter(data.chapter);
      }
    } catch (err) {
      console.error("CHAPTER FETCH ERROR:", err);
    }
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
    <div className="flex">

      {/* Sidebar */}
      <div className="fixed md:w-64 hidden md:block h-screen border-r shadow-md overflow-y-auto">

        <h2 className="font-medium text-lg bg-indigo-500 p-4 text-white">
          {course?.courseOutput?.course?.name}
        </h2>

        {course?.courseOutput?.course?.chapters.map((chapter, index) => (
          <div
            key={index}
            onClick={() =>
              GetSelectedChapterContent(index, chapter)
            }
            className={`cursor-pointer hover:bg-purple-50
              ${
                activeChapter?.chapterId === index + 1
                  ? "bg-purple-200"
                  : ""
              }
            `}
          >
            <ChapterListCard chapter={chapter} index={index} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="md:ml-64 flex-1">
        {/* Return Button */}
<div className="p-4 border-b bg-white sticky top-0 z-10">
  <Button
    onClick={() => router.push("/dashboard")}
    className="font-semibold hover:underline cursor-pointer"
  >
    ← Return to Dashboard
  </Button>
</div>

        <ChapterContent
          chapterOutline={selectedOutline}
          chapterData={activeChapter}
        />
      </div>

    </div>
  );
}

export default CourseStart;


