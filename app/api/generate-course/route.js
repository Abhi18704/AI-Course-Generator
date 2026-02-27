// import { GoogleGenAI } from "@google/genai";

// export async function POST(req) {
//   const { prompt } = await req.json();

//   const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//   });

//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: [
//       { role: "user", parts: [{ text: prompt }] },
//     ],
//   });

//   return Response.json({
//     result: response.text,
//   });
// }
// import { GoogleGenAI } from "@google/genai";
// import { db } from "@/configs/db";
// import { CourseList } from "@/configs/schema";
// import { GoogleGenAI } from "@google/genai";

// export async function POST(req) {
//   try {
//     const { prompt, meta } = await req.json();

//     if (!prompt || !meta) {
//       return Response.json(
//         { success: false, error: "Missing prompt or meta" },
//         { status: 400 }
//       );
//     }

//     const ai = new GoogleGenAI({
//       apiKey: process.env.GEMINI_API_KEY,
//     });

//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview", // more stable than preview
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const rawText = response.text;

//     if (!rawText) {
//       return Response.json(
//         { success: false, error: "Empty AI response" },
//         { status: 500 }
//       );
//     }

//     const cleanJson = rawText
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     let courseData;

//     try {
//       courseData = JSON.parse(cleanJson);
//     } catch {
//       return Response.json(
//         { success: false, error: "Invalid JSON returned by AI" },
//         { status: 500 }
//       );
//     }

//     const id = crypto.randomUUID(); // generate once

// await db.insert(CourseList).values({
//   courseId: id,

//   name: courseData.course.name,
//   category: meta.category,
//   topic: meta.topic,
//   description: meta.description,
//   level: meta.level,
//   duration: meta.duration,

//   courseOutput: courseData,

//   createdBy: meta.createdBy,
//   userName: meta.userName,
//   userProfileImage: meta.userProfileImage,
// });

// return Response.json({
//   success: true,
//   courseData,
//   courseId: id,   // now valid
// });


//   } catch (error) {
//     console.error("API ERROR:", error);
//     return Response.json(
//       { success: false, error: "Server error" },
//       { status: 500 }
//     );
//   }
// } // present route.js file 


import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { prompt, meta } = await req.json();

    if (!prompt || !meta) {
      return Response.json(
        { success: false, error: "Missing prompt or meta" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // ✅ Safer text extraction
    const rawText =
      typeof response.text === "function"
        ? response.text()
        : response.text;

    if (!rawText) {
      return Response.json(
        { success: false, error: "Empty AI response" },
        { status: 500 }
      );
    }

    // 🧹 Clean markdown
    const cleanJson = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let courseData;
    try {
      courseData = JSON.parse(cleanJson);
    } catch (err) {
      console.error("JSON PARSE ERROR:", cleanJson);
      return Response.json(
        { success: false, error: "Invalid JSON returned by AI" },
        { status: 500 }
      );
    }

    const id = crypto.randomUUID();

    // 💾 Save to Neon
    await db.insert(CourseList).values({
      courseId: id,

      name: courseData.course.name,
      category: meta.category,
      topic: meta.topic,
      description: meta.description,
      level: meta.level,
      duration: meta.duration,

      courseOutput: courseData,

      createdBy: meta.createdBy,
      userName: meta.userName,
      userProfileImage: meta.userProfileImage,
    });

    return Response.json({
      success: true,
      courseData,
      courseId: id,
    });

  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}



/* ================== OLD CLIENT SIDE DB LOGIC (DO NOT USE) ==================

const SaveCourseLayoutInDb = async (courseLayout) => {
  var id = uuid4();
  setLoading(true);

  const result = await db.insert(CourseList).values({
    courseId: id,
    name: userCourseInput?.topic,
    level: userCourseInput?.difficulty,
    category: userCourseInput?.category,
    duration: userCourseInput?.duration,
    courseOutput: courseLayout,
    createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
    userName: user?.fullName || "Unknown User",
    userProfileImage: user?.imageUrl || "",
  });

  console.log("finished");
  setLoading(false);
};

========================================================================== */

