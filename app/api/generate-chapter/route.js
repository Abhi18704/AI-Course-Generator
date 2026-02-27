// import { GoogleGenAI } from "@google/genai";

// export async function POST(req) {
//   try {
//     const { prompt } = await req.json();

//     if (!prompt) {
//       return Response.json(
//         { success: false, error: "Missing prompt" },
//         { status: 400 }
//       );
//     }

//     const ai = new GoogleGenAI({
//       apiKey: process.env.GEMINI_API_KEY,
//     });

//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const rawText =
//       typeof response.text === "function"
//         ? response.text()
//         : response.text;

//     if (!rawText) {
//       return Response.json(
//         { success: false, error: "Empty AI response" },
//         { status: 500 }
//       );
//     }

//     // clean markdown if any
//     const cleaned = rawText
//   .replace(/```json/gi, "")
//   .replace(/```/g, "")
//   .trim();

// // extract only first JSON block safely
// const match = cleaned.match(/\{[\s\S]*\}/);

// if (!match) {
//   console.log("RAW AI OUTPUT:", rawText);
//   throw new Error("No JSON found in AI response");
// }

// const chapterData = JSON.parse(match[0]);


//     return Response.json({
//       success: true,
//       chapterData,
//     });

//   } catch (error) {
//     console.error("CHAPTER API ERROR:", error);
//     return Response.json(
//       { success: false, error: error.message || "Server error" },
//       { status: 500 }
//     );
//   }
// } current route.js

//--------------chatpter route.js after edits (but not working)----------------
// import { GoogleGenAI } from "@google/genai";

// export async function POST(req) {
//   try {
//     const { prompt } = await req.json();

//     const ai = new GoogleGenAI({
//       apiKey: process.env.GEMINI_API_KEY,
//     });

//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: [{ role: "user", parts: [{ text: prompt }] }],
//     });

//     const raw =
//   typeof response.text === "function"
//     ? response.text()
//     : response.text;

// // 🔥 Remove markdown + weird formatting safely
// const cleaned = raw
//   .replace(/```json/gi, "")
//   .replace(/```/g, "")
//   .trim();

// // 🧠 Extract first JSON object only (non-greedy)
// const match = cleaned.match(/\{[\s\S]*\}/);

// if (!match) {
//   console.log("RAW AI RESPONSE:", raw);
//   throw new Error("No JSON found in AI response");
// }

// let chapterData;

// try {
//   chapterData = JSON.parse(match[0]);
// } catch (err) {
//   console.log("BROKEN JSON:", match[0]);
//   throw err;
// }

// return Response.json({
//   success: true,
//   chapterData,
// });
//   } catch (error) {
//     console.error("CHAPTER API ERROR:", error);

//     return Response.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

// testing  success
import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return Response.json({ success: false, error: "Missing prompt" }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let rawText =
      typeof response.text === "function"
        ? response.text()
        : response.text;

    if (!rawText) {
      return Response.json({ success: false, error: "Empty AI response" }, { status: 500 });
    }

    console.log("\n🧠 RAW AI OUTPUT:\n", rawText);

    // ✅ Strong JSON cleanup
    rawText = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // ✅ Try direct parse first
    try {
      const parsed = JSON.parse(rawText);

      return Response.json({
        success: true,
        chapterData: parsed,
      });
    } catch {
      // ✅ fallback: extract first JSON block safely
      const match = rawText.match(/\{[\s\S]*\}/);

      if (!match) {
        console.error("❌ No JSON found in AI output");
        return Response.json({ success: false, error: "Invalid AI JSON" }, { status: 500 });
      }

      const parsed = JSON.parse(match[0]);

      return Response.json({
        success: true,
        chapterData: parsed,
      });
    }

  } catch (err) {
    console.error("❌ CHAPTER API ERROR:", err);

    return Response.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}




